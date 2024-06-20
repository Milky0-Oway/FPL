import { Task } from '../types';

export class AddTaskForm {
    private onSubmit: (task: Task) => void;

    constructor(onSubmit: (task: Task) => void) {
        this.onSubmit = onSubmit;
    }

    render(): HTMLElement {
        const form = document.createElement('form');
        form.classList.add('add-task-form');
        form.innerHTML = `
      <input type="text" id="task-title" placeholder="Title" required>
      <input type="text" id="task-desc" placeholder="Description">
      <input type="date" id="task-date">
      <select id="task-priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>
        <input type="checkbox" id="task-completed"> Completed
      </label>
      <button type="submit">Add Task</button>
    `;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = (form.querySelector('#task-title') as HTMLInputElement).value;
            const description = (form.querySelector('#task-desc') as HTMLInputElement).value;
            const date = (form.querySelector('#task-date') as HTMLInputElement).value;
            const priority = (form.querySelector('#task-priority') as HTMLSelectElement).value;
            const completed = (form.querySelector('#task-completed') as HTMLInputElement).checked;

            this.onSubmit({ title, description, date, priority, completed });
            form.reset();
        });

        return form;
    }
}