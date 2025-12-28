function loadUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("ca-send");
    if (!btn) return;

    btn.onclick = () => {
        const name = document.getElementById("ca-name").value.trim();
        const phone = document.getElementById("ca-phone").value.trim();

        if (!name || !phone) {
            alert("Please fill all fields");
            return;
        }

        const users = loadUsers();

        users.push({
            role: "student",
            name,
            phone
        });

        saveUsers(users);

        alert("Account created successfully");

        // Redirect to main login
        window.location.href = "/page/admin/createaccount.html";
    };
});
