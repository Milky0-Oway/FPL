import { daysInMonth, firstDayOfMonth, getPrevMonth, isSelectedDate, getNextMonthDaysCount } from '../utils/dateHelpers';

interface Day {
    date: number;
    className: string;
}

interface ClickableDay extends Day {
    onClick: () => void;
}

interface DaysProps {
    currentDate: Date;
    selectedDate: Date | null;
    handleDateClick: (date: Date) => void;
}

export const getPrevMonthDays = (month: number, year: number, firstDay: number): Day[] => {
    const days: Day[] = [];
    const { prevMonth, prevYear } = getPrevMonth(month, year);
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            date: prevMonthDays - i,
            className: 'calendar-day empty'
        });
    }
    return days;
};

export const getCurrentMonthDays = (month: number, year: number, selectedDate: Date | null, handleDateClick: (date: Date) => void): ClickableDay[] => {
    const days: ClickableDay[] = [];
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

export const getNextMonthDays = (totalDays: number): Day[] => {
    const days: Day[] = [];
    const nextMonthDays = getNextMonthDaysCount(totalDays);

    for (let i = 1; i <= nextMonthDays; i++) {
        days.push({
            date: i,
            className: 'calendar-day empty'
        });
    }
    return days;
};

const isClickableDay = (day: Day | ClickableDay): day is ClickableDay => {
    return 'onClick' in day;
};

const renderDays = (props: DaysProps): HTMLElement => {
    const { currentDate, selectedDate, handleDateClick } = props;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = firstDayOfMonth(month, year);
    const daysInCurrentMonth = daysInMonth(month, year);
    const totalDays = firstDay + daysInCurrentMonth;

    const days: (Day | ClickableDay)[] = [
        ...getPrevMonthDays(month, year, firstDay),
        ...getCurrentMonthDays(month, year, selectedDate, handleDateClick),
        ...getNextMonthDays(totalDays)
    ];

    const fragment = document.createDocumentFragment();

    days.forEach((day) => {
        const dayElement = document.createElement('div');
        dayElement.className = day.className;
        dayElement.innerText = day.date.toString();

        if (isClickableDay(day)) {
            dayElement.addEventListener('click', day.onClick);
        }

        fragment.appendChild(dayElement);
    });

    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-name';
        dayElement.innerText = day;
        calendarGrid.appendChild(dayElement);
    });

    calendarGrid.appendChild(fragment);
    return calendarGrid;
};

export default renderDays;