interface NoteProps {
    note: string;
    onRemove: () => void;
}

const renderNote = (props: NoteProps): HTMLElement => {
    const { note, onRemove } = props;
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.innerText = note;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'x';
    removeButton.addEventListener('click', onRemove);

    noteElement.appendChild(removeButton);
    return noteElement;
};

export default renderNote;