// Admin credentials
const ADMIN_USERNAME = "silicongarage";
const ADMIN_PASSWORD = "sg123";

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errMsg = document.getElementById("errorMsg");

    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
        sessionStorage.setItem("adminLoggedIn", "true");
        sessionStorage.setItem("adminUser", user);
        window.location.href = "admin-panel.html";
    } else {
        errMsg.textContent = "Wrong username or password!";
    }
});