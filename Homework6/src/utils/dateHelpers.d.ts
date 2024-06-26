declare module 'dateHelpers' {
    export const getPreviousMonth: (date: Date) => Date;
    export const getNextMonth: (date: Date) => Date;
    export const formatDateString: (date: Date) => string;
    export const daysInMonth: (month: number, year: number) => number;
    export const firstDayOfMonth: (month: number, year: number) => number;
    export const getPrevMonth: (month: number, year: number) => { prevMonth: number; prevYear: number };
    export const isSelectedDate: (selectedDate: Date | null, day: number, month: number, year: number, dayClassName: string) => boolean;
    export const getNextMonthDaysCount: (totalDays: number) => number;
}