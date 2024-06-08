import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Days from '../src/components/Days';
import Calendar from "../src/components/Calendar";
import '@testing-library/jest-dom';

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

describe('Days component utility functions', () => {
    describe('daysInMonth', () => {
        it('should return correct number of days in a month', () => {
            expect(daysInMonth(0, 2024)).toBe(31);
            expect(daysInMonth(1, 2024)).toBe(29);
            expect(daysInMonth(1, 2023)).toBe(28);
            expect(daysInMonth(3, 2024)).toBe(30);
        });
    });

    describe('firstDayOfMonth', () => {
        it('should return correct first day of the month', () => {
            expect(firstDayOfMonth(0, 2024)).toBe(1);
            expect(firstDayOfMonth(1, 2024)).toBe(4);
            expect(firstDayOfMonth(1, 2023)).toBe(3);
            expect(firstDayOfMonth(3, 2024)).toBe(1);
        });
    });
});

describe('Days component rendering', () => {
    it('should mark selected date correctly', () => {
        const selectedDate = new Date(2024, 0, 15);
        const { container } = render(<Days currentDate={new Date(2024, 0, 1)} selectedDate={selectedDate} />);
        const selectedDay = container.querySelector('.calendar-day.selected');

        expect(selectedDay).not.toBeNull();
        expect(selectedDay.textContent).toMatch(/^15/);
    });

    it('should render correct days for February 2024 (leap year)', () => {
        const { container } = render(<Days currentDate={new Date(2024, 1, 1)} selectedDate={null} />);
        const days = container.querySelectorAll('.calendar-day');
        expect(days.length).toBe(35);
    });

    it('should render correct days for December 2023', () => {
        const { container } = render(<Days currentDate={new Date(2023, 11, 1)} selectedDate={null} />);
        const days = container.querySelectorAll('.calendar-day');
        expect(days.length).toBe(42);
    });
});

describe('Notes functionality', () => {
   beforeEach(() => {
       localStorage.clear();
   });

    it('should add a note to the selected date', () => {
        render(<Calendar />);
        const date = new Date(2024, 0, 15);
        const dateString = date.toISOString().split('T')[0];
        fireEvent.change(screen.getByLabelText('Date'), { target: { value: dateString } });
        fireEvent.click(screen.getByText('15'));

        const noteInput = screen.getByPlaceholderText('Add a note');
        fireEvent.change(noteInput, { target: { value: 'Test' } });
        fireEvent.click(screen.getByText('Save'));

        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should remove a note to the selected date', () => {
        render(<Calendar />);
        const date = new Date(2024, 0, 15);
        const dateString = date.toISOString().split('T')[0];
        fireEvent.change(screen.getByLabelText('Date'), { target: { value: dateString } });
        fireEvent.click(screen.getByText('15'));

        const noteInput = screen.getByPlaceholderText('Add a note');
        fireEvent.change(noteInput, { target: { value: 'Test' } });
        fireEvent.click(screen.getByText('Save'));

        const removeButton = screen.getByText('x');
        fireEvent.click(removeButton);

        expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });

    it('should persist notes in localStorage', () => {
        render(<Calendar />);
        const date = new Date(2024, 0, 15);
        const dateString = date.toISOString().split('T')[0];
        fireEvent.change(screen.getByLabelText('Date'), { target: { value: dateString } });
        fireEvent.click(screen.getByText('15'));

        const noteInput = screen.getByPlaceholderText('Add a note');
        fireEvent.change(noteInput, { target: { value: 'Test' } });
        fireEvent.click(screen.getByText('Save'));

        const storedNotes = JSON.parse(localStorage.getItem('calendar-notes'));
        expect(storedNotes).toEqual({
            '2024-1-15': ['Test']
        });
    });
});