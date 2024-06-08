import React, { useState } from 'react';
import './Calendar.css';
import Days from './Days';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
            setSelectedDate(date);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        document.getElementById("date-input").value = dateString;
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
                id="date-input"
                aria-label="Date"
            />
            <div className="calendar-grid">
                <div className="calendar-day-name">Sun</div>
                <div className="calendar-day-name">Mon</div>
                <div className="calendar-day-name">Tue</div>
                <div className="calendar-day-name">Wed</div>
                <div className="calendar-day-name">Thu</div>
                <div className="calendar-day-name">Fri</div>
                <div className="calendar-day-name">Sat</div>
                <Days
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    handleDateClick={handleDateClick}
                />
            </div>
        </div>
    );
};

export default Calendar;