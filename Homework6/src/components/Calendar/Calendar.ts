import {
    getPreviousMonth,
    getNextMonth,
    formatDateString,
    getNextMonthDaysCount,
    firstDayOfMonth,
    daysInMonth,
    isSelectedDate,
    getPrevMonth
} from '../../utils/dateHelpers';
import { DaysProps, Notes } from "../";

type DayName = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

type Day = {
    date: number;
    className: string;
    onClick: () => void;
};

export class Calendar {
    private currentDate: Date;
    private selectedDate?: Date | null;
    private inputRef: HTMLInputElement | null;

    constructor({ currentDate, selectedDate, handleDateClick }: DaysProps) {
        this.currentDate = currentDate;
        this.selectedDate = selectedDate;
        this.inputRef = null;
    }

    public renderDays(): HTMLElement {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = firstDayOfMonth(month, year);
        const daysInCurrentMonth = daysInMonth(month, year);
        const totalDays = firstDay + daysInCurrentMonth;

        const container = document.createElement('div');
        container.className = 'calendar-grid';

        const days = [
            ...this.getPrevMonthDays(month, year, firstDay),
            ...this.getCurrentMonthDays(month, year),
            ...this.getNextMonthDays(totalDays)
        ];

        days.forEach((day) => {
            const dayElement = document.createElement('div');
            dayElement.className = day.className;
            dayElement.textContent = day.date.toString();

            if (day.onClick) {
                dayElement.addEventListener('click', day.onClick);
            }

            if (this.selectedDate && isSelectedDate(this.selectedDate, day.date, month, year, day.className)) {
                const note = new Notes({ dateKey: `${year}-${month + 1}-${day.date}` });
                const noteElement = note.render();
                dayElement.appendChild(noteElement);
            }

            container.appendChild(dayElement);
        });

        return container;
    }

    handleDateChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const date = new Date(target.value);
        if (!isNaN(date.valueOf())) {
            this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
            this.selectedDate = date;
            this.render();
        }
        const dateInput = document.querySelector('#task-date') as HTMLInputElement | null;
        if (dateInput) {
            dateInput.value = formatDateString(date);
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

    handleDateClick = (date: Date) => {
        this.selectedDate = date;
        const dateInput = document.querySelector('#date-input') as HTMLInputElement | null;
        if (dateInput) {
            dateInput.value = formatDateString(date);
        }
        const taskDateInput = document.querySelector('#task-date') as HTMLInputElement | null;
        if (taskDateInput) {
            taskDateInput.value = formatDateString(date);
        }
        this.render();
    };

    public render(): HTMLElement {
        let container = document.querySelector('.calendar-container');
        if (container) {
            container.innerHTML = '';
        } else {
            container = document.createElement('div');
            container.className = 'calendar-container';
        }

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
        dateInput.id = 'date-input';
        dateInput.type = 'date';
        dateInput.addEventListener('change', this.handleDateChange);
        if (this.selectedDate) {
            dateInput.value = formatDateString(this.selectedDate);
        }
        this.inputRef = dateInput;

        container.appendChild(header);
        container.appendChild(dateInput);
        container.appendChild(this.renderDays());

        return container as HTMLElement;
    }

    private getPrevMonthDays(month: number, year: number, firstDay: number) {
        const days = [];
        const { prevMonth, prevYear } = getPrevMonth(month, year);
        const prevMonthDays = daysInMonth(prevMonth, prevYear);

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                date: prevMonthDays - i,
                className: "calendar-day empty",
                onClick: () => { }
            });
        }
        return days;
    }

    private getCurrentMonthDays(month: number, year: number): Day[] {
        const days: Day[] = [];
        const daysInCurrentMonth = daysInMonth(month, year);

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const isSelected = this.selectedDate ? isSelectedDate(this.selectedDate, day, month, year, '') : false;
            const date = new Date(year, month, day);
            days.push({
                date: day,
                className: `calendar-day ${isSelected ? 'selected' : ''}`,
                onClick: () => this.handleDateClick(date)
            });
        }
        return days;
    }

    private getNextMonthDays(totalDays: number): Day[] {
        const days: Day[] = [];
        const nextMonthDays = getNextMonthDaysCount(totalDays);

        for (let i = 1; i <= nextMonthDays; i++) {
            days.push({
                date: i,
                className: "calendar-day empty",
                onClick: () => { }
            });
        }
        return days;
    }
}