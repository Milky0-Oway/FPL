export const getPreviousMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

export const getNextMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

export const formatDateString = (date: Date): string => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
};

export const daysInMonth = (month: number, year: number): number => new Date(year, month + 1, 0).getDate();

export const firstDayOfMonth = (month: number, year: number): number => new Date(year, month, 1).getDay();

export const getPrevMonth = (month: number, year: number): { prevMonth: number, prevYear: number } => {
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevYear = month - 1 < 0 ? year - 1 : year;
    return { prevMonth, prevYear };
};

export const isSelectedDate = (selectedDate: Date | null, day: number, month: number, year: number, dayClassName: string): boolean => {
    return !!selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year &&
        dayClassName !== 'calendar-day empty';
};

export const getNextMonthDaysCount = (totalDays: number): number => {
    return (totalDays % 7 === 0) ? 0 : (7 - (totalDays % 7));
};