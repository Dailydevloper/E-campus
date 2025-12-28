// FAKE API LINKS
const SUBJECT_API = "https://your-backend.com/api/subjects";
const STUDENTS_API = "https://your-backend.com/api/get-students";
const SUBMIT_API  = "https://your-backend.com/api/submit-attendance";

let attendanceData = {};  // { studentId: "P" or "A" }

// Load subjects from backend
function loadSubjects() {
    fetch(SUBJECT_API)
        .then(res => res.json())
        .then(data => {
            let select = document.getElementById("subjectSelect");
            select.innerHTML = `<option value="">Select Subject</option>`;

            data.subjects.forEach(sub => {
                select.innerHTML += `<option value="${sub}">${sub}</option>`;
            });
        });
}

loadSubjects();

// Load students when subject is selected
function loadStudents() {
    let subject = document.getElementById("subjectSelect").value;
    if (!subject) return;

    document.getElementById("studentList").innerHTML =
        `<p class="loading">Loading students...</p>`;

    fetch(STUDENTS_API + "?subject=" + subject)
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("studentList");
            list.innerHTML = "";

            data.students.forEach(std => {
                attendanceData[std.id] = ""; // init

                list.innerHTML += `
                <div class="student-card">
                    <span class="student-name">${std.name}</span>
                    <div class="btn-group">
                        <button class="present-btn" onclick="markPresent('${std.id}', this)">P</button>
                        <button class="absent-btn" onclick="markAbsent('${std.id}', this)">A</button>
                    </div>
                </div>`;
            });
        });
}

// Mark Present
function markPresent(id, btn) {
    attendanceData[id] = "P";

    let parent = btn.parentNode;
    parent.querySelector(".present-btn").classList.add("present-active");
    parent.querySelector(".absent-btn").classList.remove("absent-active");
}

// Mark Absent
function markAbsent(id, btn) {
    attendanceData[id] = "A";

    let parent = btn.parentNode;
    parent.querySelector(".absent-btn").classList.add("absent-active");
    parent.querySelector(".present-btn").classList.remove("present-active");
}

// Submit Attendance
function submitAttendance() {
    let subject = document.getElementById("subjectSelect").value;
    if (!subject) {
        alert("Please select a subject!");
        return;
    }

    let formatted = [];

    for (let id in attendanceData) {
        if (attendanceData[id] !== "") {
            formatted.push({ studentId: id, status: attendanceData[id] });
        }
    }

    if (formatted.length === 0) {
        alert("Please mark attendance!");
        return;
    }

    fetch(SUBMIT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            subject: subject,
            attendance: formatted
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Attendance submitted successfully!");
        history.back();
    });
}
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


