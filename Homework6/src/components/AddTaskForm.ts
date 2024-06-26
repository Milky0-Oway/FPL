import { Task } from '../types';
import { Validator } from './Validator';
import Calendar from "./Calendar";

interface AddTaskFormProps {
    onSubmit: (task: Task) => void;
}

export class AddTaskForm {
    private validator: Validator;
    private onSubmit: (task: Task) => void;
    private selectedDate: Date | null;

    constructor(onSubmit: (task: Task) => void) {
        this.onSubmit = onSubmit;
        this.validator = new Validator();
        this.selectedDate = null;
    }

    handleDateClick = (date: Date) => {
        this.selectedDate = date;
        const dateInput = document.querySelector('#task-date') as HTMLInputElement | null;
        if (dateInput) {
            dateInput.value = date.toISOString().split('T')[0];
        }
    };

    handleSubmit = (event: Event) => {
        event.preventDefault();

        const titleInput = document.querySelector('#task-title') as HTMLInputElement | null;
        const descriptionInput = document.querySelector('#task-desc') as HTMLInputElement | null;
        const priorityInput = document.querySelector('#task-priority') as HTMLSelectElement | null;
        const completedInput = document.querySelector('#task-completed') as HTMLInputElement | null;
        const dateInput = document.querySelector('#task-date') as HTMLInputElement | null;

        if (!titleInput || !descriptionInput || !priorityInput || !completedInput || !dateInput) {
            console.error("One or more input elements not found");
            return;
        }

        const task: Task = {
            title: titleInput.value,
            description: descriptionInput.value,
            date: dateInput.value,
            priority: priorityInput.value,
            completed: completedInput.checked,
        };

        const isValid = this.validator.validate({
            title: titleInput,
            description: descriptionInput,
            date: dateInput,
        });

        if (isValid) {
            this.onSubmit(task);
            const form = document.querySelector('.add-task-form') as HTMLFormElement | null;
            if (form) {
                form.reset();
            }
        } else {
            const errorsContainer = document.querySelector('#validation-errors');
            if (errorsContainer) {
                errorsContainer.innerHTML = '';
                for (const error in this.validator.getErrors()) {
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.innerText = this.validator.getErrors()[error];
                    errorsContainer.appendChild(errorElement);
                }
            }
        }
    };

    render() {
        const form = document.createElement('form');
        form.className = 'add-task-form';
        form.addEventListener('submit', this.handleSubmit);

        form.innerHTML = `
            <input type="text" id="task-title" placeholder="Title" />
            <input type="text" id="task-desc" placeholder="Description" />
            <input type="hidden" id="task-date"/>
            <div id="calendar-container"></div>
            <select id="task-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <label>
                <input type="checkbox" id="task-completed" /> Completed
            </label>
            <button type="submit">Add Task</button>
            <div id="validation-errors"></div>
        `;

        const calendarContainer = form.querySelector('#calendar-container');
        if (calendarContainer) {
            const calendar = new Calendar({
                onDateSelect: (date: Date) => {
                    const dateInput = form.querySelector('#task-date') as HTMLInputElement | null;
                    if (dateInput) {
                        dateInput.value = date.toISOString().split('T')[0];
                    }
                },
                handleDateClick: this.handleDateClick,
            });
            calendarContainer.appendChild(calendar.render());
        }

        return form;
    }
}