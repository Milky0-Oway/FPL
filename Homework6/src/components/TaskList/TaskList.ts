import { Task } from '../../types';

export class TaskList {
    private taskListBody: HTMLTableSectionElement;
    private onToggleComplete: (index: number) => void;

    constructor(onToggleComplete: (index: number) => void) {
        this.taskListBody = document.createElement('tbody');
        this.onToggleComplete = onToggleComplete;
    }

    update(tasks: Task[], filters: any) {
        const { showCompleted, textSearch, dateFrom, dateTo } = filters;

        this.taskListBody.innerHTML = '';

        const filteredTasks = tasks.filter(task => {
            const matchesCompleted = showCompleted || !task.completed;
            const matchesText = task.title.toLowerCase().includes(textSearch) || task.description.toLowerCase().includes(textSearch);
            const matchesDateFrom = !dateFrom || (task.date && new Date(task.date) >= new Date(dateFrom));
            const matchesDateTo = !dateTo || (task.date && new Date(task.date) <= new Date(dateTo));

            return matchesCompleted && matchesText && matchesDateFrom && matchesDateTo;
        });

        filteredTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.date || ''}</td>
        <td>${task.priority}</td>
        <td>
          <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
        </td>
      `;
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.onToggleComplete(index);
                });
            }
            this.taskListBody.appendChild(row);
        });
    }

    render(): HTMLElement {
        const table = document.createElement('table');
        table.classList.add('task-list');
        table.innerHTML = `
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Completed</th>
        </tr>
      </thead>
    `;
        table.appendChild(this.taskListBody);
        return table;
    }
}