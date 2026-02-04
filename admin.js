// Check if admin is logged in
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin-login.html';
}

// Initialize questions from localStorage or use default
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [
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

// Save questions to localStorage
function saveQuestions() {
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
}

// Render questions list
function renderQuestions() {
    const container = document.getElementById('questionsList');
    const countEl = document.getElementById('questionCount');
    
    countEl.textContent = questions.length;
    
    if (questions.length === 0) {
        container.innerHTML = '<div class="no-questions">No questions added yet. Add your first question above!</div>';
        return;
    }
    
    container.innerHTML = questions.map((q, index) => `
        <div class="question-item">
            <div class="question-item-header">
                <h4>Q${index + 1}. ${q.question}</h4>
                <button class="delete-btn" onclick="deleteQuestion(${q.id})">🗑️ Delete</button>
            </div>
            <div class="question-item-meta">
                <span>✅ Correct: +${q.marks} marks</span>
                <span>❌ Wrong: -${q.negativeMarks} marks</span>
            </div>
            <div class="question-item-options">
                ${q.options.map((opt, i) => `
                    <span class="${i === q.correctAnswer ? 'correct' : ''}">
                        ${String.fromCharCode(65 + i)}. ${opt} ${i === q.correctAnswer ? '✓' : ''}
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Add new question
document.getElementById('questionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newQuestion = {
        id: Date.now(),
        question: document.getElementById('question').value,
        options: [
            document.getElementById('option1').value,
            document.getElementById('option2').value,
            document.getElementById('option3').value,
            document.getElementById('option4').value
        ],
        correctAnswer: parseInt(document.getElementById('correctAnswer').value),
        marks: parseInt(document.getElementById('marks').value),
        negativeMarks: parseInt(document.getElementById('negativeMarks').value)
    };
    
    questions.push(newQuestion);
    saveQuestions();
    renderQuestions();
    
    // Reset form
    this.reset();
    document.getElementById('marks').value = 4;
    document.getElementById('negativeMarks').value = 1;
    
    // Show success message
    showNotification('Question added successfully!');
});

// Delete question
function deleteQuestion(id) {
    if (confirm('Are you sure you want to delete this question?')) {
        questions = questions.filter(q => q.id !== id);
        saveQuestions();
        renderQuestions();
        showNotification('Question deleted!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Logout function
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
    window.location.href = 'admin-login.html';
}

// Initial render
renderQuestions();

// Add notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);