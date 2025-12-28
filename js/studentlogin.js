document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("sl-login");

    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("sl-username").value.trim();
        const password = document.getElementById("sl-password").value;

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        /* ===============================
           BACKEND INTEGRATION POINT
        =============================== */

        /*
        fetch("/api/student/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("token", data.token);
                window.location.href = "/page/student/studenthome.html";
            } else {
                alert("Invalid credentials");
            }
        });
        */

        // ✅ TEMP FRONTEND DEMO LOGIC (REMOVE LATER)
        if (username === "student" && password === "1234") {
            document.body.style.opacity = "0";
            document.body.style.transition = "opacity 0.4s";

            setTimeout(() => {
                window.location.href = "/page/student/studenthome.html";
            }, 400);
        } else {
            alert("Invalid username or password");
        }
    });
});

