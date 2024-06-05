import React from 'react';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const getPrevMonthDays = (month, year, firstDay) => {
    const days = [];
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevYear = month - 1 < 0 ? year - 1 : year;
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            date: prevMonthDays - i,
            className: "calendar-day empty"
        });
    }
    return days;
};

const getCurrentMonthDays = (month, year, selectedDate) => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(month, year);

    for (let day = 1; day <= daysInCurrentMonth; day++) {
        const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
        days.push({
            date: day,
            className: `calendar-day ${isSelected ? 'selected' : ''}`
        });
    }
    return days;
};

const getNextMonthDays = (totalDays) => {
    const days = [];
    const nextMonthDays = (totalDays % 7 === 0) ? 0 : (7 - (totalDays % 7));

    for (let i = 1; i <= nextMonthDays; i++) {
        days.push({
            date: i,
            className: "calendar-day empty"
        });
    }
    return days;
};

const Days = ({ currentDate, selectedDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = firstDayOfMonth(month, year);
    const daysInCurrentMonth = daysInMonth(month, year);
    const totalDays = firstDay + daysInCurrentMonth;

    const days = [
        ...getPrevMonthDays(month, year, firstDay),
        ...getCurrentMonthDays(month, year, selectedDate),
        ...getNextMonthDays(totalDays)
    ];

    return (
        <>
            {days.map((day, index) => (
                <div key={index} className={day.className}>
                    {day.date}
                </div>
            ))}
        </>
    );
};

export default Days;