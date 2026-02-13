let questions = [];
let current = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let unansweredCount = 0;
let timerInterval;
let timeLeft = 30;
let answered = false;

const TIME_LIMIT = 30;
const DELAY = 2000;

function loadQuestions() {
 const data = localStorage.getItem("quizQuestions");
if (data) {
     questions = JSON.parse(data);
 } else {
     questions = [
            {
                id: 1,
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
                correctAnswer: 0,
                marks: 4,
                negativeMarks: 1
            },
            {
                id: 2,
                question: "Which language is used for styling web pages?",
                options: ["HTML", "JQuery", "CSS", "XML"],
                correctAnswer: 2,
                marks: 4,
                negativeMarks: 1
            },
            {
                id: 3,
                question: "Which is a JavaScript framework?",
                options: ["React", "Angular", "Django", "Vue"],
                correctAnswer: 0,
                marks: 4,
                negativeMarks: 1
            },
            {
                id: 4,
                question: "What does CSS stand for?",
                options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
                correctAnswer: 1,
                marks: 4,
                negativeMarks: 1
            },
            {
                id: 5,
                question: "Which HTML tag is used for the largest heading?",
                options: ["<h6>", "<heading>", "<h1>", "<head>"],
                correctAnswer: 2,
                marks: 4,
                negativeMarks: 1
            }
        ];
    }
}


function startQuiz() {
   loadQuestions();
    if (!questions.length) {
          alert("No questions available!");
        return;
    }
     document.getElementById("startScreen").style.display = "none";
     document.getElementById("questionScreen").style.display = "block";
     showQuestion();
} 


function showQuestion() {
    answered = false;
    timeLeft = TIME_LIMIT;
    const q = questions[current];

      document.getElementById("questionNumber").textContent = "Question " + (current + 1) + "/" + questions.length;
      document.getElementById("currentScore").textContent = "Score: " + score;

      const pct = (current / questions.length) * 100;
      document.getElementById("progressBar").style.width = pct + "%";
      document.getElementById("questionText").textContent = q.question;

    let opts = "";
     for (let i = 0; i < q.options.length; i++) {
         const letter = String.fromCharCode(65 + i);
          opts += `<button class="option-btn" onclick="pickAnswer(${i})">${letter}. ${q.options[i]}</button>`;
    }
      document.getElementById("optionsContainer").innerHTML = opts;
       document.getElementById("nextBtn").disabled = true;
      startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
      document.getElementById("timeLeft").textContent = timeLeft;
      document.getElementById("timer").classList.remove("warning");

      timerInterval = setInterval(() => {
          timeLeft--;
          document.getElementById("timeLeft").textContent = timeLeft;

         if (timeLeft <= 10) {
              document.getElementById("timer").classList.add("warning");
        }

        if (timeLeft <= 0) {
              clearInterval(timerInterval);
              if (!answered) {
                 unansweredCount++;
                 const btns = document.querySelectorAll(".option-btn");
                  for (let i = 0; i < btns.length; i++) {
                    btns[i].classList.add("nope");
                }
                  btns[questions[current].correctAnswer].classList.add("correct");
                  setTimeout(goNext, 1500);
            }
        }
    }, 1000);
}

function pickAnswer(idx) {
    if (answered) return;
      answered = true;
     clearInterval(timerInterval);

    const q = questions[current];
       const btns = document.querySelectorAll(".option-btn");
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.add("nope");
    }

    if (idx === q.correctAnswer) {
          btns[idx].classList.add("correct");
          score += q.marks;
           correctCount++;
    } else {
          btns[idx].classList.add("wrong");
        score -= q.negativeMarks;
          wrongCount++;
        btns[q.correctAnswer].classList.add("correct");
    }

    document.getElementById("currentScore").textContent = "Score: " + score;
    document.getElementById("nextBtn").disabled = false;
    setTimeout(() => {
        if (answered) goNext();
    }, DELAY);
}

function nextQuestion() {
    clearInterval(timerInterval);
    goNext();
}

function goNext() {
    current++;
    if (current >= questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function showResults() {
    clearInterval(timerInterval);
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";
    document.getElementById("progressBar").style.width = "100%";

    unansweredCount = questions.length - correctCount - wrongCount;
    document.getElementById("finalScore").textContent = score;
    document.getElementById("correctAnswers").textContent = correctCount;
    document.getElementById("wrongAnswers").textContent = wrongCount;
    document.getElementById("unanswered").textContent = unansweredCount;

    const pct = (correctCount / questions.length) * 100;
    let msg = "Better luck next time!";
    if (pct >= 80) msg = "Excellent work!";
    else if (pct >= 60) msg = "Great job!";
    else if (pct >= 40) msg = "Not bad, keep learning!";
    
    document.getElementById("resultMessage").textContent = msg;
}

loadQuestions();