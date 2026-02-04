// Admin credentials 
const ADMIN_CREDENTIALS = {
    username: 'silicongarage',
    password: 'sg123'
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set session
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', username);
        
        // Redirect to admin panel
        window.location.href = 'admin-panel.html';
    } else {
        errorMsg.textContent = '❌ Invalid username or password!';
        
        // Shake animation
        document.querySelector('.login-card').style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.querySelector('.login-card').style.animation = '';
        }, 500);
    }
});

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);