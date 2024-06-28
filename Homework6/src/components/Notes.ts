import Note from "./Note";

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

    render(): string {
        const notesList = this.notes[this.dateKey]?.map((note, index) => {
            const noteComponent = new Note({
                note: note,
                onRemove: this.onRemove(index),
            });
            return noteComponent.render();
        }).join('') || '';

        return `
            <div class='notes-container'>
                ${notesList}
                <div class='note-input'>
                    <input
                        type='text'
                        value='${this.noteInput}'
                        placeholder='Add a note'
                        oninput='(${this.onChange.toString()})(event)'
                    />
                    <button onclick='(${this.handleSaveNote.toString()})()'>Save</button>
                </div>
            </div>
        `;
    }
}

export { Notes, NotesProps };