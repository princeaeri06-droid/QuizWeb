if (sessionStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [
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
        question: "Which is not a JavaScript framework?",
        options: ["React", "Angular", "Django", "Vue"],
        correctAnswer: 2,
        marks: 4,
        negativeMarks: 1
    }
];

function saveQuestions() {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
}

function renderQuestions() {
    const list = document.getElementById("questionsList");
    const count = document.getElementById("questionCount");
    count.textContent = questions.length;

    if (!questions.length) {
        list.innerHTML = "<p style='color:#999; text-align:center; padding:20px;'>No questions yet. Add one above!</p>";
        return;
    }

    let html = "";
    questions.forEach((q, i) => {
        html += '<div class="q-item">';
        html += `<button class="del-btn" onclick="deleteQuestion(${q.id})">Delete</button>`;
        html += `<h4>Q${i + 1}. ${q.question}</h4>`;
        html += `<small>Correct: +${q.marks} | Wrong: -${q.negativeMarks}</small>`;
        html += '<div class="opts">';
        
        q.options.forEach((opt, j) => {
              const letter = String.fromCharCode(65 + j);
              html += j === q.correctAnswer 
                ? `<span class="right">${letter}. ${opt} ✓</span>`
                : `<span>${letter}. ${opt}</span>`;
        });
        
        html += '</div></div>';
    });
    
    list.innerHTML = html;
}

document.getElementById("questionForm").addEventListener("submit", (e) => {
       e.preventDefault();
  
    const q = {
           id: Date.now(),
        question: document.getElementById("question").value,
          options: [
            document.getElementById("option1").value,
            document.getElementById("option2").value,
            document.getElementById("option3").value,
            document.getElementById("option4").value
        ],
          correctAnswer: parseInt(document.getElementById("correctAnswer").value),
          marks: parseInt(document.getElementById("marks").value),
           negativeMarks: parseInt(document.getElementById("negativeMarks").value)
    };

    questions.push(q);
    saveQuestions();
    renderQuestions();
    e.target.reset();
    document.getElementById("marks").value = 4;
    document.getElementById("negativeMarks").value = 1;
    alert("Question added!");
});

function deleteQuestion(id) {
    if (confirm("Delete this question?")) {
        questions = questions.filter(q => q.id !== id);
        saveQuestions();
        renderQuestions();
    }
}

function logout() {
     sessionStorage.removeItem("adminLoggedIn");
     sessionStorage.removeItem("adminUser");
     window.location.href = "admin-login.html";
}

renderQuestions();
