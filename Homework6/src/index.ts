import { AddTaskForm } from './components/AddTaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { Task } from './types';

class TodoApp {
    private tasks: Task[] = [];
    private addTaskForm: AddTaskForm;
    private taskFilter: TaskFilter;
    private taskList: TaskList;

    constructor() {
        this.addTaskForm = new AddTaskForm(this.addTask.bind(this));
        this.taskFilter = new TaskFilter(this.updateTaskList.bind(this));
        this.taskList = new TaskList(this.toggleTaskCompletion.bind(this));
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.updateTaskList();
    }

    toggleTaskCompletion(index: number) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.updateTaskList();
    }

    updateTaskList() {
        const filters = this.taskFilter.getFilters();
        this.taskList.update(this.tasks, filters);
    }

    render() {
        const app = document.getElementById('app');
        if (app && app.innerHTML === '') {
            app.appendChild(this.addTaskForm.render());
            app.appendChild(this.taskFilter.render());
            app.appendChild(this.taskList.render());
        }
    }
}

const todoApp = new TodoApp();
todoApp.render();
