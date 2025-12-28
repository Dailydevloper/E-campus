/* ===============================
   STUDENT INQUIRY PAGE
=============================== */

// Backend will replace this URL
const SUBJECT_API = "/api/student/subjects";
const SEND_INQUIRY_API = "/api/student/inquiry";

/* ---------- Load Subjects ---------- */
function loadSubjects() {
    fetch(SUBJECT_API)
        .then(res => res.json())
        .then(data => {
            const subjectBox = document.getElementById("inqSubject");
            subjectBox.innerHTML = `<option value="">Select Subject</option>`;

            data.subjects.forEach(sub => {
                subjectBox.innerHTML += `<option value="${sub}">${sub}</option>`;
            });
        })
        .catch(() => {
            alert("Failed to load subjects");
        });
}

loadSubjects();

/* ---------- Submit Inquiry ---------- */
function submitInquiry() {
    const subject = document.getElementById("inqSubject").value;
    const date = document.getElementById("inqDate").value;
    const desc = document.getElementById("inqDesc").value;

    if (!subject || !date || !desc) {
        alert("Please fill all fields");
        return;
    }

    const inquiryData = {
        subject,
        date,
        description: desc
    };

    fetch(SEND_INQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData)
    })
    .then(res => res.json())
    .then(() => {
        alert("Inquiry submitted successfully");
        history.back();
    })
    .catch(() => {
        alert("Failed to submit inquiry");
    });
}

/* ---------- FOOTER NAVIGATION ---------- */
function goStudentHome() {
    window.location.href = "/page/student/studenthome.html";
}

function goStudentClassSchedule() {
    window.location.href = "/page/student/classstudent.html";
}

function goStudentAttendance() {
    window.location.href = "/page/student/studentattendence.html";
}

function goStudentInquiry() {
    window.location.href = "/page/student/inquirystudent.html";
}

function goStudentCalendar() {
     window.location.href = "/page/student/calendarstudent.html";
}

