import React from 'react';

import Notes from "./Notes";

import { daysInMonth, firstDayOfMonth, getPrevMonth, isSelectedDate, getNextMonthDaysCount } from '../utils/dateHelpers';

const getPrevMonthDays = (month, year, firstDay) => {
    const days = [];
    const { prevMonth, prevYear } = getPrevMonth(month, year);
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            date: prevMonthDays - i,
            className: "calendar-day empty"
        });
    }
    return days;
};

const getCurrentMonthDays = (month, year, selectedDate, handleDateClick) => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(month, year);

    for (let day = 1; day <= daysInCurrentMonth; day++) {
        const isSelected = isSelectedDate(selectedDate, day, month, year, '');
        const date = new Date(year, month, day);
        days.push({
            date: day,
            className: `calendar-day ${isSelected ? 'selected' : ''}`,
            onClick: () => handleDateClick(date)
        });
    }
    return days;
};

const getNextMonthDays = (totalDays) => {
    const days = [];
    const nextMonthDays = getNextMonthDaysCount(totalDays);

    for (let i = 1; i <= nextMonthDays; i++) {
        days.push({
            date: i,
            className: "calendar-day empty"
        });
    }
    return days;
};

const Days = ({ currentDate, selectedDate, handleDateClick }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = firstDayOfMonth(month, year);
    const daysInCurrentMonth = daysInMonth(month, year);
    const totalDays = firstDay + daysInCurrentMonth;

    const days = [
        ...getPrevMonthDays(month, year, firstDay),
        ...getCurrentMonthDays(month, year, selectedDate, handleDateClick),
        ...getNextMonthDays(totalDays)
    ];

    return (
        <>
            {days.map((day, index) => (
                <div key={index} className={day.className} onClick={day.onClick}>
                    {day.date}
                    {isSelectedDate(selectedDate, day.date, month, year, day.className) && (
                        <Notes dateKey={`${year}-${month+1}-${day.date}`}/>
                    )}
                </div>
            ))}
        </>
    );
};

export default Days;