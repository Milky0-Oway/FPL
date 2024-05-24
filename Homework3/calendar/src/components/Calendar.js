import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
            setSelectedDate(date);
        }
    };

    const renderDays = () => {
        const days = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInCurrentMonth = daysInMonth(month, year);
        const firstDay = firstDayOfMonth(month, year);
        const prevMonthDays = daysInMonth(month - 1 < 0 ? 11 : month - 1, month - 1 < 0 ? year - 1 : year);

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push(
                <div key={`prev-${i}`} className="calendar-day empty">
                    {prevMonthDays - i}
                </div>
            );
        }

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            days.push(
                <div key={day} className={`calendar-day ${isSelected ? 'selected' : ''}`}>
                    {day}
                </div>
            );
        }

        const totalDays = firstDay + daysInCurrentMonth;
        const nextMonthDays = (totalDays % 7 === 0) ? 0 : (7 - (totalDays % 7));

        for (let i = 1; i <= nextMonthDays; i++) {
            days.push(
                <div key={`next-${i}`} className="calendar-day empty">
                    {i}
                </div>
            );
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>{'<'}</button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <button onClick={handleNextMonth}>{'>'}</button>
            </div>
            <input
                type="date"
                onChange={handleDateChange}
                className="calendar-date-input"
            />
            <div className="calendar-grid">
                <div className="calendar-day-name">Sun</div>
                <div className="calendar-day-name">Mon</div>
                <div className="calendar-day-name">Tue</div>
                <div className="calendar-day-name">Wed</div>
                <div className="calendar-day-name">Thu</div>
                <div className="calendar-day-name">Fri</div>
                <div className="calendar-day-name">Sat</div>
                {renderDays()}
            </div>
        </div>
    );
};

export default Calendar;