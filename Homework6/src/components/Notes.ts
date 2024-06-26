import renderNote from './Note';

interface NotesProps {
    dateKey: string;
}

interface NotesState {
    [key: string]: string[];
}

const renderNotes = (props: NotesProps): HTMLElement => {
    const { dateKey } = props;
    let notes: NotesState = JSON.parse(localStorage.getItem('calendar-notes') || '{}');
    let noteInput: string = '';

    const notesContainer = document.createElement('div');
    notesContainer.className = 'notes-container';

    const render = () => {
        notesContainer.innerHTML = '';

        if (notes[dateKey]) {
            notes[dateKey].forEach((note, index) => {
                const noteElement = renderNote({
                    note,
                    onRemove: () => handleRemoveNote(index)
                });
                notesContainer.appendChild(noteElement);
            });
        }

        const noteInputContainer = document.createElement('div');
        noteInputContainer.className = 'note-input';

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = 'Add a note';
        inputElement.value = noteInput;
        inputElement.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            noteInput = target.value;
        });

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.addEventListener('click', handleSaveNote);

        noteInputContainer.appendChild(inputElement);
        noteInputContainer.appendChild(saveButton);

        notesContainer.appendChild(noteInputContainer);
    };

    const handleSaveNote = () => {
        if (!noteInput.trim()) return;
        const newNotes = { ...notes };
        if (!newNotes[dateKey]) {
            newNotes[dateKey] = [];
        }
        newNotes[dateKey].push(noteInput.trim());
        notes = newNotes;
        noteInput = '';
        localStorage.setItem('calendar-notes', JSON.stringify(notes));
        render();
    };

    const handleRemoveNote = (noteIndex: number) => {
        const newNotes = { ...notes };
        newNotes[dateKey].splice(noteIndex, 1);
        if (newNotes[dateKey].length === 0) {
            delete newNotes[dateKey];
        }
        notes = newNotes;
        localStorage.setItem('calendar-notes', JSON.stringify(notes));
        render();
    };

    render();

    return notesContainer;
};

export default renderNotes;