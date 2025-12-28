// Initialize Framework7
const app = new Framework7({
    el: '#app',
    name: 'Academic Admin',
});

let calendarInline;
let eventsList = [
    { date: new Date(), title: 'Admin Active', type: 'general' }
];

window.onload = function() {
    renderCalendar();
    
    // Add Event Button Listener
    document.getElementById('btnAddEvent').addEventListener('click', addEvent);
};

// Function to Create/Refresh Calendar
function renderCalendar() {
    if (calendarInline) calendarInline.destroy();

    calendarInline = app.calendar.create({
        containerEl: '#calendar-container',
        value: [new Date()],
        weekHeader: true,
        events: eventsList.map(e => ({
            date: new Date(e.date),
            cssClass: 'event-' + e.type
        })),
        on: {
            dayClick(c, dayEl, year, month, day) {
                const clickedDate = new Date(year, month, day).toDateString();
                const found = eventsList.find(e => new Date(e.date).toDateString() === clickedDate);
                if (found) {
                    app.dialog.alert(`${found.title} (${found.type.toUpperCase()})`);
                }
            }
        }
    });
}

// Function to Add Event
function addEvent() {
    const title = document.getElementById('eventTitle').value;
    const dateVal = document.getElementById('eventDate').value;
    const type = document.getElementById('eventType').value;

    if (!title || !dateVal) {
        app.dialog.alert("Please fill in all fields.");
        return;
    }

    eventsList.push({
        date: new Date(dateVal),
        title: title,
        type: type
    });

    renderCalendar();

    // Clear Inputs
    document.getElementById('eventTitle').value = "";
    document.getElementById('eventDate').value = "";
    
    app.toast.create({ text: 'Event Added!', closeTimeout: 2000 }).open();
}

// Navigation Functions
function goHome() { window.location.href = "/page/admin/adminhome.html"; }
function goAdminSchedule() { window.location.href = "/page/admin/adminschedule.html"; }
function goMarkAttendance() { window.location.href = "/page/admin/markattendence.html"; }
function goInquiry() { window.location.href = "/page/admin/inquiryadmin.html"; }
function goCalendar() { window.location.href = "/page/admin/admincalender.html"; }