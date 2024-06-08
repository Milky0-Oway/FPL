export const getPreviousMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

export const getNextMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

export const formatDateString = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

export const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

export const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

export const getPrevMonth = (month, year) => {
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevYear = month - 1 < 0 ? year - 1 : year;
    return { prevMonth, prevYear };
};

export const isSelectedDate = (selectedDate, day, month, year, dayClassName) => {
    return selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year &&
        dayClassName !== 'calendar-day empty';
};

export const getNextMonthDaysCount = (totalDays) => {
    return (totalDays % 7 === 0) ? 0 : (7 - (totalDays % 7));
};
