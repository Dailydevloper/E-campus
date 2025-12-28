/* =========================
   UTILS
========================= */
function loadUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function setLoggedIn(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function getLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

/* =========================
   ENSURE DEFAULT ADMIN
========================= */
function ensureAdmin() {
    const users = loadUsers();
    if (!users.find(u => u.role === "admin")) {
        users.push({
            role: "admin",
            username: "admin",
            password: "admin123",
            name: "Admin"
        });
        saveUsers(users);
    }
}

/* =========================
   ADMIN LOGIN
========================= */
function initAdminLogin() {
    ensureAdmin();

    const btn = document.getElementById("al-login");
    if (!btn) return;

    btn.onclick = () => {
        const username = document.getElementById("al-username").value.trim();
        const password = document.getElementById("al-password").value;

        const users = loadUsers();
        const admin = users.find(
            u => u.role === "admin" && u.username === username
        );

        if (!admin || admin.password !== password) {
            alert("Invalid Admin Login (default: admin / admin123)");
            return;
        }

        setLoggedIn(admin);

        // ✅ Smooth transition
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.4s";

        setTimeout(() => {
            window.location.href = "/page/admin/adminhome.html";
        }, 400);
    };
}

/* =========================
   ROUTER
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.split("/").pop();

    if (page === "adminlogin.html") initAdminLogin();
});
