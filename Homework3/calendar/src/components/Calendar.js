import React, { useState, useRef } from 'react';

import Days from './Days';

import { getPreviousMonth, getNextMonth, formatDateString } from '../utils/dateHelpers';

import './Calendar.css';

const Calendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const inputRef = useRef(null);

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
            setSelectedDate(date);
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(getPreviousMonth(currentDate));
    };

    const handleNextMonth = () => {
        setCurrentDate(getNextMonth(currentDate));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const dateString = formatDateString(date);
        if (inputRef.current) {
            inputRef.current.value = dateString;
        }
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
                ref={inputRef}
            />
            <div className="calendar-grid">
                {days.map((day) => (
                    <div key={day} className="calendar-day-name">
                        {day}
                    </div>
                ))}
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