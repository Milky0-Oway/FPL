export class TaskFilter {
    private onFilter: () => void;

    constructor(onFilter: () => void) {
        this.onFilter = onFilter;
    }

    render(): HTMLElement {
        const filter = document.createElement('div');
        filter.classList.add('filter');
        filter.innerHTML = `
      <label>
        <input type="checkbox" id="show-completed"> Show Completed
      </label>
      <input type="text" id="text-search" placeholder="Search by text">
      <input type="date" id="date-from"> - <input type="date" id="date-to">
    `;

        filter.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => this.onFilter());
        });

        return filter;
    }

    getFilters() {
        const showCompleted = (document.getElementById('show-completed') as HTMLInputElement).checked;
        const textSearch = (document.getElementById('text-search') as HTMLInputElement).value.toLowerCase();
        const dateFrom = (document.getElementById('date-from') as HTMLInputElement).value;
        const dateTo = (document.getElementById('date-to') as HTMLInputElement).value;

        return { showCompleted, textSearch, dateFrom, dateTo };
    }
}