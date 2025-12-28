function loadUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("np-send");
    if (!btn) return;

    btn.onclick = () => {
        const pass = document.getElementById("np-pass").value;
        const confirm = document.getElementById("np-confirm").value;

        if (!pass || !confirm) {
            alert("Please fill all fields");
            return;
        }

        if (pass !== confirm) {
            alert("Passwords do not match");
            return;
        }

        const user = getLoggedIn();
        if (!user) {
            alert("Session expired. Please login again.");
            window.location.href = "/page/admin/adminlogin.html";
            return;
        }

        const users = loadUsers();
        const index = users.findIndex(
            u => u.name === user.name && u.role === user.role
        );

        if (index === -1) {
            alert("User not found");
            return;
        }

        users[index].password = pass;
        saveUsers(users);

        alert("Password updated successfully");

        // Redirect to login
        window.location.href = "/page/admin/adminlogin.html";
    };
});
