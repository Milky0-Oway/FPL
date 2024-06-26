import { getPreviousMonth, getNextMonth, formatDateString, daysInMonth, firstDayOfMonth } from '../utils/dateHelpers';
import { getCurrentMonthDays, getPrevMonthDays, getNextMonthDays } from './Days';

interface Day {
    date: number;
    className: string;
}

interface ClickableDay extends Day {
    onClick: () => void;
}

interface CalendarProps {
    onDateSelect: (date: Date) => void;
    handleDateClick: (date: Date) => void;
}

export default class Calendar {
    private currentDate: Date;
    private selectedDate: Date | null;
    private inputRef: HTMLInputElement | null;
    private onDateSelect: (date: Date) => void;
    private handleDateClick: (date: Date) => void;

    constructor(props: CalendarProps) {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.inputRef = null;
        this.onDateSelect = props.onDateSelect;
        this.handleDateClick = props.handleDateClick;
    }

    handleDateChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const date = new Date(target.value);
        if (!isNaN(date.valueOf())) {
            this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
            this.selectedDate = date;
            this.render();
        }
    };

    handlePrevMonth = () => {
        this.currentDate = getPreviousMonth(this.currentDate);
        this.render();
    };

    handleNextMonth = () => {
        this.currentDate = getNextMonth(this.currentDate);
        this.render();
    };

    renderDays(): HTMLElement {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = firstDayOfMonth(month, year);
        const daysInCurrentMonth = daysInMonth(month, year);
        const totalDays = firstDay + daysInCurrentMonth;

        const days: (Day | ClickableDay)[] = [
            ...getPrevMonthDays(month, year, firstDay),
            ...getCurrentMonthDays(month, year, this.selectedDate, this.handleDateClick),
            ...getNextMonthDays(totalDays)
        ];

        const fragment = document.createDocumentFragment();

        days.forEach((day) => {
            const dayElement = document.createElement('div');
            dayElement.className = day.className;
            dayElement.innerText = day.date.toString();
            if ('onClick' in day) {
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
    }

    render() {
        const container = document.createElement('div');
        container.className = 'calendar-container';

        const header = document.createElement('div');
        header.className = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.innerText = '<';
        prevButton.addEventListener('click', this.handlePrevMonth);

        const nextButton = document.createElement('button');
        nextButton.innerText = '>';
        nextButton.addEventListener('click', this.handleNextMonth);

        const monthLabel = document.createElement('h2');
        monthLabel.innerText = `${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}`;

        header.appendChild(prevButton);
        header.appendChild(monthLabel);
        header.appendChild(nextButton);

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.addEventListener('change', this.handleDateChange);
        this.inputRef = dateInput;

        container.appendChild(header);
        container.appendChild(dateInput);
        container.appendChild(this.renderDays());

        return container;
    }
}