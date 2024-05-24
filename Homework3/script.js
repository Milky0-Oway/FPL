document.addEventListener('DOMContentLoaded', () => {
    const calendarTitle = document.getElementById('calendarTitle');
    const dateInput = document.getElementById('dateInput');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const calendarGrid = document.querySelector('.calendar-grid');
    let currentDate = new Date();
    let selectedDate = null;

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const updateCalendar = () => {
        calendarGrid.innerHTML = `
      <div class="calendar-day-name">Sun</div>
      <div class="calendar-day-name">Mon</div>
      <div class="calendar-day-name">Tue</div>
      <div class="calendar-day-name">Wed</div>
      <div class="calendar-day-name">Thu</div>
      <div class="calendar-day-name">Fri</div>
      <div class="calendar-day-name">Sat</div>
    `;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInCurrentMonth = daysInMonth(month, year);
        const firstDay = firstDayOfMonth(month, year);
        const prevMonthDays = daysInMonth(month - 1 < 0 ? 11 : month - 1, month - 1 < 0 ? year - 1 : year);

        calendarTitle.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        for (let i = firstDay - 1; i >= 0; i--) {
            calendarGrid.innerHTML += `<div class="calendar-day empty">${prevMonthDays - i}</div>`;
        }

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            calendarGrid.innerHTML += `<div class="calendar-day ${isSelected ? 'selected' : ''}">${day}</div>`;
        }

        const totalDays = firstDay + daysInCurrentMonth;
        const nextMonthDays = (totalDays % 7 === 0) ? 0 : (7 - (totalDays % 7));

        for (let i = 1; i <= nextMonthDays; i++) {
            calendarGrid.innerHTML += `<div class="calendar-day empty">${i}</div>`;
        }
    };

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
            selectedDate = date;
            updateCalendar();
        }
    };

    const handlePrevMonth = () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        updateCalendar();
    };

    const handleNextMonth = () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        updateCalendar();
    };

    dateInput.addEventListener('change', handleDateChange);
    prevMonthButton.addEventListener('click', handlePrevMonth);
    nextMonthButton.addEventListener('click', handleNextMonth);

    updateCalendar();
});