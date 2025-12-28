const token = localStorage.getItem("token");

// API ENDPOINTS (Backend team will replace base URL)
const CLASS_API    = "/api/admin/classes";
const SUBJECT_API  = "/api/admin/subjects";
const SCHEDULE_API = "/api/admin/schedule";

const classFilter   = document.getElementById("classFilter");
const subjectFilter = document.getElementById("subjectFilter");
const scheduleBox   = document.getElementById("adminScheduleList");

/* ---------------- LOAD FILTER DATA ---------------- */

async function loadClasses() {
    const res = await fetch(CLASS_API, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    data.classes.forEach(cls => {
        classFilter.innerHTML += `<option value="${cls}">${cls}</option>`;
    });
}

async function loadSubjects() {
    const res = await fetch(SUBJECT_API, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    data.subjects.forEach(sub => {
        subjectFilter.innerHTML += `<option value="${sub}">${sub}</option>`;
    });
}

/* ---------------- LOAD SCHEDULE ---------------- */

async function loadSchedule() {
    scheduleBox.innerHTML = `<p class="loading-text">Loading...</p>`;

    const cls = classFilter.value;
    const sub = subjectFilter.value;

    const url = `${SCHEDULE_API}?class=${cls}&subject=${sub}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    scheduleBox.innerHTML = "";

    if (data.schedule.length === 0) {
        scheduleBox.innerHTML = `<p>No records found</p>`;
        return;
    }

    data.schedule.forEach(item => {
        scheduleBox.innerHTML += `
            <div class="schedule-card">
                <h4>${item.subject}</h4>
                <p>Class: ${item.class}</p>
                <p>Time: ${item.startTime} - ${item.endTime}</p>
                <p>Teacher: ${item.teacher}</p>
            </div>
        `;
    });
}

/* ---------------- EVENTS ---------------- */

classFilter.addEventListener("change", loadSchedule);
subjectFilter.addEventListener("change", loadSchedule);

/* ---------------- INIT ---------------- */

loadClasses();
loadSubjects();
loadSchedule();
/*-------path navigation---------*/

function goHome() {
  window.location.href = "/page/admin/adminhome.html";
}
function goAdminSchedule() {
  window.location.href = "/page/admin/adminschedule.html";
}

function goMarkAttendance() {
  window.location.href = "/page/admin/markattendence.html";
}

function goInquiry() {
  window.location.href = "/page/admin/inquiryadmin.html";
}

function goCalendar() {
  window.location.href = "/page/admin/admincalender.html";
}

