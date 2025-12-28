/* ================= AUTH ================= */
const token = localStorage.getItem("token");

/* ================= API ENDPOINTS ================= */
const ADMIN_INQ_API = "/api/admin/inquiries";
const APPROVE_API   = "/api/admin/inquiry/approve";
const REJECT_API    = "/api/admin/inquiry/reject";

/* ================= DOM ================= */
const filterClass   = document.getElementById("filterClass");
const filterSubject = document.getElementById("filterSubject");
const inquiryList   = document.getElementById("inquiryList");

let fullList = [];

/* ================= LOAD INQUIRIES ================= */
async function loadInquiries() {
    inquiryList.innerHTML = `<p class="loading">Loading inquiries...</p>`;

    try {
        const res = await fetch(ADMIN_INQ_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        fullList = data.inquiries || [];

        populateFilters(fullList);
        render(fullList);

    } catch (err) {
        inquiryList.innerHTML = `<p>Error loading inquiries</p>`;
        console.error(err);
    }
}

/* ================= FILTER DROPDOWNS ================= */
function populateFilters(data) {
    filterClass.innerHTML = `<option value="">Class</option>`;
    filterSubject.innerHTML = `<option value="">Subject</option>`;

    [...new Set(data.map(i => i.class))].forEach(c => {
        filterClass.innerHTML += `<option value="${c}">${c}</option>`;
    });

    [...new Set(data.map(i => i.subject))].forEach(s => {
        filterSubject.innerHTML += `<option value="${s}">${s}</option>`;
    });
}

/* ================= RENDER ================= */
function render(list) {
    inquiryList.innerHTML = "";

    if (list.length === 0) {
        inquiryList.innerHTML = `<p>No inquiries found</p>`;
        return;
    }

    list.forEach(item => {
        inquiryList.innerHTML += `
        <div class="inquiry-card">
            <p><b>Student:</b> ${item.student}</p>
            <p><b>Class:</b> ${item.class}</p>
            <p><b>Subject:</b> ${item.subject}</p>
            <p><b>Date:</b> ${item.date}</p>
            <p>${item.description}</p>

            <div class="btn-row">
                <button class="action-btn accept" onclick="approve(${item.id})">Approve</button>
                <button class="action-btn reject" onclick="reject(${item.id})">Reject</button>
            </div>
        </div>`;
    });
}

/* ================= FILTERING ================= */
function applyFilters() {
    const c = filterClass.value;
    const s = filterSubject.value;

    const filtered = fullList.filter(item =>
        (c === "" || item.class === c) &&
        (s === "" || item.subject === s)
    );

    render(filtered);
}

filterClass.addEventListener("change", applyFilters);
filterSubject.addEventListener("change", applyFilters);

/* ================= ACTIONS ================= */
async function approve(id) {
    await fetch(`${APPROVE_API}/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
    loadInquiries();
}

async function reject(id) {
    await fetch(`${REJECT_API}/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
    loadInquiries();
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


