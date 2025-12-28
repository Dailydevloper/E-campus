/*********************************
 * Attendance Page JS
 * Backend-ready structure
 *********************************/

/* ---------------- NAVIGATION ---------------- */

function goHome() {
    window.location.href = "/page/admin/adminhome.html";
}t

function goAdminSchedule() {
  window.location.href = "/page/admin/adminschedule.html";
}

function goMarkAttendance() {
  console.log("/page/admin/markattendence");
}

function goInquiry() {
  window.location.href = "/page/admin/inquiryadmin.html";
}

function goCalendar() {
 window.location.href = "/page/admin/admincalender.html";
}


/* ---------------- ATTENDANCE DATA (PLACEHOLDER) ---------------- */

/*
 Backend team will later replace this with API data
 Example API:
 GET /api/admin/attendance
*/

const attendanceSampleData = [
  { date: "2025-01-01", status: "P" },
  { date: "2025-01-02", status: "A" },
  { date: "2025-01-03", status: "P" },
  { date: "2025-01-04", status: "P" },
  { date: "2025-01-05", status: "A" },
];


/* ---------------- RENDER ATTENDANCE ---------------- */

function renderAttendance(data) {
  const rows = document.querySelectorAll(".att-row");

  rows.forEach((row, index) => {
    const spans = row.querySelectorAll("span");

    if (data[index]) {
      spans.forEach(span => {
        span.textContent = data[index].status === "P" ? "P" : "A";
        span.style.color = data[index].status === "P" ? "#2ecc71" : "#e74c3c";
      });
    }
  });
}


/* ---------------- INIT ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Temporary data render
  renderAttendance(attendanceSampleData);

  // Later backend call will go here
  // loadAttendanceFromBackend();
});


/* ---------------- BACKEND HOOK (FOR LATER) ---------------- */

/*
async function loadAttendanceFromBackend() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/admin/attendance", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  renderAttendance(data.attendance);
}
*/
