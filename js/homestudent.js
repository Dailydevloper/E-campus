/* =========================
   STUDENT HOME – ATTENDANCE
   Backend team will connect API
========================= */

// TEMP DATA (REMOVE WHEN BACKEND IS READY)
let present = 42;
let total = 50;

// Calculate attendance %
const percent = Math.round((present / total) * 100);

// UI element
const attendanceEl = document.getElementById("attendanceValue");

// Update UI
attendanceEl.innerText = percent + "%";

// Color logic
if (percent < 35) {
    attendanceEl.style.color = "#e74c3c"; // red
} else if (percent < 75) {
    attendanceEl.style.color = "#f1c40f"; // yellow
} else {
    attendanceEl.style.color = "#27ae60"; // green
}

/*
🔗 BACKEND REPLACEMENT (future)

fetch("/api/student/attendance")
  .then(res => res.json())
  .then(data => {
     present = data.present;
     total = data.total;
  });
*/
// Change goSchedule to goClassSchedule
function goClassSchedule() {
    window.location.href = "/page/student/classstudent.html";
}

function goAttendance() {
    window.location.href = "/page/student/studentattendence.html";
}

function goInquiry() {
    window.location.href = "/page/student/inquirystudent.html";
}

function goCalendar() {
    window.location.href = "/page/student/calendarstudent.html";
}

// Change goStudentProfile to goProfile
function goProfile() {
    window.location.href = "/page/student/studentprofile.html";
}
