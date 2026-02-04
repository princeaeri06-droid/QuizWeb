// Quiz State
let questions = [];
let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let unansweredCount = 0;
let timer;
let timeLeft = 30;
let answered = false;

//  basically Load the questions from localStorage of browser
function loadQuestions() {
    const stored = localStorage.getItem('quizQuestions');
    if (stored) {
        questions = JSON.parse(stored);
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

// This function is for Start the Quiz
function startQuiz() {
    loadQuestions();
    
    if (questions.length === 0) {
        alert('No questions available! Please ask admin to add questions.');
        return;
    }
    
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('questionScreen').classList.remove('hidden');
    
    showQuestion();
}

// Showing the current question
function showQuestion() {
    answered = false;
    timeLeft = 30;
    
    const question = questions[currentQuestion];
    
    // Update question number and progress
    document.getElementById('questionNumber').textContent = 
        `Question ${currentQuestion + 1}/${questions.length}`;
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    document.getElementById('progressBar').style.width = 
        `${((currentQuestion) / questions.length) * 100}%`;
    
    // Show question text
    document.getElementById('questionText').textContent = question.question;
    
    // Generate options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((opt, index) => `
        <button class="option" onclick="selectOption(${index})">
            ${String.fromCharCode(65 + index)}. ${opt}
        </button>
    `).join('');
    
    // Disable next button
    document.getElementById('nextBtn').disabled = true;
    
    // Start timer
    startTimer();
}

// Timer function
function startTimer() {
    clearInterval(timer);
    document.getElementById('timeLeft').textContent = timeLeft;
    document.getElementById('timer').classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        
        // Warning when 10 seconds left
        if (timeLeft <= 10) {
            document.getElementById('timer').classList.add('warning');
        }
        
        // Time's up - auto advance
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answered) {
                unansweredCount++;
                showCorrectAnswer();
                setTimeout(() => {
                    autoNextQuestion();
                }, 1500);
            }
        }
    }, 1000);
}

// Select option
function selectOption(index) {
    if (answered) return;
    answered = true;
    
    clearInterval(timer);
    
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Mark selected option
    options[index].classList.add('selected');
    
    // Check if correct
    if (index === question.correctAnswer) {
        options[index].classList.remove('selected');
        options[index].classList.add('correct');
        score += question.marks;
        correctCount++;
    } else {
        options[index].classList.remove('selected');
        options[index].classList.add('wrong');
        score -= question.negativeMarks;
        wrongCount++;
        // Show correct answer
        options[question.correctAnswer].classList.add('correct');
    }
    
    // Update score display
    document.getElementById('currentScore').textContent = `Score: ${score}`;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
    
    // Auto advance after 2 seconds
    setTimeout(() => {
        if (answered) {
            autoNextQuestion();
        }
    }, 2000);
}

// Show correct answer (for timeout)
function showCorrectAnswer() {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach(opt => opt.classList.add('disabled'));
    options[question.correctAnswer].classList.add('correct');
}

// Next question (manual)
function nextQuestion() {
    clearInterval(timer);
    autoNextQuestion();
}

// Auto next question
function autoNextQuestion() {
    currentQuestion++;
    
    if (currentQuestion >= questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

// Show final results
function showResults() {
    clearInterval(timer);
    
    document.getElementById('questionScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    
    // Update progress bar to 100%
    document.getElementById('progressBar').style.width = '100%';
    
    // Calculate unanswered
    unansweredCount = questions.length - correctCount - wrongCount;
    
    // Display stats
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('wrongAnswers').textContent = wrongCount;
    document.getElementById('unanswered').textContent = unansweredCount;
    
    // Result message
    const percentage = (correctCount / questions.length) * 100;
    let message;
    
    if (percentage >= 80) {
        message = "🏆 Excellent! You're a quiz master!";
    } else if (percentage >= 60) {
        message = "👏 Great job! Keep it up!";
    } else if (percentage >= 40) {
        message = "📚 Good effort! Room for improvement.";
    } else {
        message = "💪 Keep practicing! You'll do better next time.";
    }
    
    document.getElementById('resultMessage').textContent = message;
}

// Initialize
loadQuestions();