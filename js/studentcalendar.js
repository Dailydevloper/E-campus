// 1. Initialize Framework7 for Student Portal
const app = new Framework7({
    el: '#app',
    name: 'Student Portal',
    theme: 'auto', 
});

let studentCalendar;
let academicEvents = []; // Starts empty, populated by Backend

/**
 * FETCH DATA FROM BACKEND
 * This is the "Backend Addition" part. It replaces mock data 
 * with real data from your server/database.
 */
async function fetchCalendarEvents() {
    try {
        // Replace with your actual API endpoint URL
        const response = await fetch('https://your-api.com/api/get-events.php');
        const data = await response.json();
        
        // Transform backend data into JS Date objects
        academicEvents = data.map(item => ({
            date: new Date(item.event_date), // backend date format: YYYY-MM-DD
            title: item.event_title,
            type: item.event_type // holiday, exam, or general
        }));

        renderStudentCalendar();
    } catch (error) {
        console.error("Error loading events:", error);
        // Fallback: Render empty calendar if backend fails
        renderStudentCalendar();
    }
}

/**
 * Renders the Framework7 Calendar with Highlighting
 */
function renderStudentCalendar() {
    studentCalendar = app.calendar.create({
        containerEl: '#calendar-container',
        value: [new Date()],
        weekHeader: true,
        // HIGHLIGHTING LOGIC: Assigns CSS classes based on event type
        events: academicEvents.map(e => ({
            date: e.date,
            cssClass: 'event-' + e.type 
        })),
        on: {
            dayClick(calendar, dayEl, year, month, day) {
                const clickedDate = new Date(year, month, day).toDateString();
                const found = academicEvents.find(e => e.date.toDateString() === clickedDate);
                
                if (found) {
                    // Displays the popup as seen in your previews
                    app.dialog.alert(found.title, "Event Details");
                }
            }
        }
    });
}

// Initialize on page load
window.onload = function() {
    fetchCalendarEvents();
};

/**
 * Navigation Routes
 * Matches your student folder structure
 */
function goHome() { window.location.href = "/page/student/studenthome.html"; }
function goSchedule() { window.location.href = "/page/student/classstudent.html"; }
function goAttendance() { window.location.href = "/page/student/studentattendence.html"; }
function goInquiry() { window.location.href = "/page/student/inquirystudent.html"; }
function goCalendar() { window.location.href = "/page/student/studentcalendar.html"; }