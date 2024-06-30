import { daysInMonth, firstDayOfMonth, getPrevMonth, isSelectedDate, getNextMonthDaysCount } from '../../utils/dateHelpers';

type Day = {
    date: number;
    className: string;
    onClick: () => void;
};

const getPrevMonthDays = (month: number, year: number, firstDay: number): Day[] => {
    const days: Day[] = [];
    const { prevMonth, prevYear } = getPrevMonth(month, year);
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            date: prevMonthDays - i,
            className: "calendar-day empty",
            onClick: () => {}
        });
    }
    return days;
};

const getCurrentMonthDays = (month: number, year: number, selectedDate: Date | null, handleDateClick: (date: Date) => void): Day[] => {
    const days: Day[] = [];
    const daysInCurrentMonth = daysInMonth(month, year);

    for (let day = 1; day <= daysInCurrentMonth; day++) {
        const isSelected = selectedDate ? isSelectedDate(selectedDate, day, month, year, '') : false;
        const date = new Date(year, month, day);
        days.push({
            date: day,
            className: `calendar-day ${isSelected ? 'selected' : ''}`,
            onClick: () => handleDateClick(date)
        });
    }
    return days;
};

const getNextMonthDays = (totalDays: number): Day[] => {
    const days: Day[] = [];
    const nextMonthDays = getNextMonthDaysCount(totalDays);

    for (let i = 1; i <= nextMonthDays; i++) {
        days.push({
            date: i,
            className: "calendar-day empty",
            onClick: () => {}
        });
    }
    return days;
};

type DaysProps = {
    currentDate: Date;
    selectedDate?: Date | null;
    handleDateClick: (date: Date) => void;
};

class Days {
    private currentDate: Date;
    private selectedDate: Date | null;
    private handleDateClick: (date: Date) => void;

    constructor({ currentDate, selectedDate = null, handleDateClick }: DaysProps) {
        this.currentDate = currentDate;
        this.selectedDate = selectedDate;
        this.handleDateClick = handleDateClick;
    }

    render(): string {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = firstDayOfMonth(month, year);
        const daysInCurrentMonth = daysInMonth(month, year);
        const totalDays = firstDay + daysInCurrentMonth;

        const days = [
            ...getPrevMonthDays(month, year, firstDay),
            ...getCurrentMonthDays(month, year, this.selectedDate, this.handleDateClick),
            ...getNextMonthDays(totalDays)
        ];

        return days.map((day, index) => {
            const isSelected = this.selectedDate ? isSelectedDate(this.selectedDate, day.date, month, year, day.className) : false;
            return `
                <div key=${index} class="${day.className}" ${day.onClick ? `onclick="(${day.onClick.toString()})()"` : ''}>
                    ${day.date}
                </div>
            `;
        }).join('');
    }
}

export { Days, DaysProps };