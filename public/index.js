document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const logoutBtn = document.getElementById("logout-btn");
    const toggleText = document.getElementById("toggle-text");
    const formTitle = document.getElementById("form-title");
    const toggleForm = document.getElementById("toggle-form");

    let isSignup = false;

    // Toggle between Login and Sign Up
    if (toggleForm) {
        toggleForm.addEventListener("click", (e) => {
            e.preventDefault();
            isSignup = !isSignup;
            formTitle.textContent = isSignup ? "Sign Up" : "Login";
            loginForm.querySelector("button").textContent = isSignup ? "Sign Up" : "Login";
            toggleText.innerHTML = isSignup ? 'Already have an account? <a href="#" id="toggle-form">Login</a>' : 'New here? <a href="#" id="toggle-form">Sign up</a>';
        });
    }

    // Handle Login or Sign Up
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch(isSignup ? "/signup" : "/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("user", email);
                window.location.href = "index.html"; // Redirect after login
            } else {
                loginError.textContent = data.message;
            }
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }
});
