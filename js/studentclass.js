/* ================================
   STUDENT CLASS SCHEDULE
   Backend-ready version
================================ */

// Backend team will replace this URL
const STUDENT_API = "/api/student/class-schedule";

function loadStudentSchedule() {
    const container = document.getElementById("scheduleList");

    // Show loading state
    container.innerHTML = `<p class="loading-text">Loading schedule...</p>`;

    fetch(STUDENT_API)
        .then(res => {
            if (!res.ok) throw new Error("API error");
            return res.json();
        })
        .then(data => {
            // Backend must send: { schedule: [] }
            if (!data.schedule || data.schedule.length === 0) {
                container.innerHTML = `<p>No schedule available</p>`;
                return;
            }
            renderSchedule(data.schedule);
        })
        .catch(() => {
            container.innerHTML =
                `<p style="text-align:center;color:red">
                    Failed to load schedule
                 </p>`;
        });
}

function renderSchedule(schedule) {
    const container = document.getElementById("scheduleList");
    container.innerHTML = "";

    schedule.forEach(item => {
        container.innerHTML += `
            <div class="schedule-card">
                <div class="subject">${item.subject}</div>
                <div class="time">⏰ ${item.time}</div>
                <div class="room">📍 ${item.room}</div>
            </div>
        `;
    });
}

// Load on page open
loadStudentSchedule();

/* ================================
   FOOTER NAVIGATION (STUDENT)
================================ */

function goHome() {
    window.location.href = "/page/student/studenthome.html";
}

function goSchedule() {
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
