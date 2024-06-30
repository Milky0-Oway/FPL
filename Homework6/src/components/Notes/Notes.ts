type NotesProps = {
    dateKey: string;
};

class Notes {
    private dateKey: string;
    private notes: Record<string, string[]>;
    private noteInput: string;

    constructor({ dateKey }: NotesProps) {
        this.dateKey = dateKey;
        this.notes = JSON.parse(localStorage.getItem('calendar-notes') || '{}');
        this.noteInput = '';

        this.handleSaveNote = this.handleSaveNote.bind(this);
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    private saveNotesToLocalStorage() {
        localStorage.setItem('calendar-notes', JSON.stringify(this.notes));
    }

    private handleSaveNote() {
        if (!this.noteInput.trim()) return;
        if (!this.notes[this.dateKey]) {
            this.notes[this.dateKey] = [];
        }
        this.notes[this.dateKey].push(this.noteInput.trim());
        this.noteInput = '';
        this.saveNotesToLocalStorage();
        this.render();
    }

    private handleRemoveNote(noteIndex: number) {
        this.notes[this.dateKey].splice(noteIndex, 1);
        if (this.notes[this.dateKey].length === 0) {
            delete this.notes[this.dateKey];
        }
        this.saveNotesToLocalStorage();
        this.render();
    }

    private onRemove(index: number) {
        return () => this.handleRemoveNote(index);
    }

    private onChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.noteInput = input.value;
    }

    render(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'notes-container';

        const notesList = document.createElement('div');
        notesList.className = 'notes-list';

        if (this.notes[this.dateKey]) {
            this.notes[this.dateKey].forEach((note, index) => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note-item';
                noteElement.textContent = note;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'x';
                removeButton.addEventListener('click', this.onRemove(index));

                noteElement.appendChild(removeButton);
                notesList.appendChild(noteElement);
            });
        }

        const noteInputContainer = document.createElement('div');
        noteInputContainer.className = 'note-input';

        const noteInput = document.createElement('input');
        noteInput.type = 'text';
        noteInput.value = this.noteInput;
        noteInput.placeholder = 'Add a note';
        noteInput.addEventListener('input', this.onChange);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', this.handleSaveNote);

        noteInputContainer.appendChild(noteInput);
        noteInputContainer.appendChild(saveButton);

        container.appendChild(notesList);
        container.appendChild(noteInputContainer);

        return container;
    }
}

export { Notes, NotesProps };