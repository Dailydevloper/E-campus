document.addEventListener("DOMContentLoaded", () => {

    // TEMP DATA (replace with backend API later)
    const attendanceData = [
        { subject: "Maths", present: 22, total: 30 },
        { subject: "Physics", present: 18, total: 25 },
        { subject: "Chemistry", present: 26, total: 28 },
        { subject: "Computer", present: 30, total: 32 }
    ];

    // Choose bar color based on percentage
    function getColor(p) {
        if (p < 35) return "red";
        if (p < 75) return "orange";
        return "green";
    }

    const container = document.getElementById("attendance-list");

    // Safety check
    if (!container) {
        console.error("attendance-list element not found");
        return;
    }

    container.innerHTML = "";

    attendanceData.forEach(sub => {
        const percent = Math.round((sub.present / sub.total) * 100);
        const color = getColor(percent);

        container.innerHTML += `
            <div class="att-card">
                <div class="att-top">
                    <div class="att-subject">${sub.subject}</div>
                    <div class="att-percent">${percent}%</div>
                </div>

                <div class="att-bar-bg">
                    <div class="att-bar-fill ${color}" style="width:${percent}%"></div>
                </div>

                <p class="att-info">
                    ${sub.present}/${sub.total} classes attended
                </p>
            </div>
        `;
    });
})

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
