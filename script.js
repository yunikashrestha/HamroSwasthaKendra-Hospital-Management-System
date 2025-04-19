const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const modal = document.getElementById("appointmentModal");
const closeModal = document.querySelector(".close");
const saveAppointmentBtn = document.getElementById("saveAppointment");
const selectedDateText = document.getElementById("selectedDateText");
const patientNameInput = document.getElementById("patientName");
const appointmentTimeInput = document.getElementById("appointmentTime");

let currentDate = new Date();
let appointments = {}; 

function generateCalendar(year, month) {
    calendarBody.innerHTML = ""; 

    const firstDay = new Date(year, month, 1).getDay(); 
    const totalDays = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");
            
            if ((i === 0 && j < firstDay) || date > totalDays) {
                cell.textContent = "";
            } else {
                cell.textContent = date;
                let fullDate = `${year}-${month + 1}-${date}`;

                if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    cell.classList.add("current-day");
                }

                if (appointments[fullDate]) {
                    appointments[fullDate].forEach(appt => {
                        let apptDiv = document.createElement("div");
                        apptDiv.classList.add("appointment");
                        apptDiv.textContent = `${appt.name} @ ${appt.time}`;
                        cell.appendChild(apptDiv);
                    });
                }

                cell.addEventListener("click", () => openModal(fullDate));

                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
        if (date > totalDays) break;
    }
}

// Open modal for booking
function openModal(date) {
    if (!date) return; // Prevent modal from opening without a date selection

    selectedDateText.textContent = `Book Appointment for ${date}`;
    patientNameInput.value = "";
    appointmentTimeInput.value = "";
    modal.style.display = "flex";

    saveAppointmentBtn.onclick = function() {
        let name = patientNameInput.value.trim();
        let time = appointmentTimeInput.value.trim();

        if (!name || !time) {
            alert("Please enter all details!");
            return;
        }

        if (!appointments[date]) {
            appointments[date] = [];
        }
        appointments[date].push({ name, time });

        modal.style.display = "none";
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    };
}

// Close modal
closeModal.onclick = () => { modal.style.display = "none"; };
window.onclick = (event) => { if (event.target === modal) modal.style.display = "none"; };

// Navigation buttons
prevMonthBtn.onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); generateCalendar(currentDate.getFullYear(), currentDate.getMonth()); };
nextMonthBtn.onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); generateCalendar(currentDate.getFullYear(), currentDate.getMonth()); };

// Initialize calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("appointmentModal").style.display = "none";
});