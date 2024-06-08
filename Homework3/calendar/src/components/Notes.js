import React, {useState, useEffect} from "react";

import Note from "./Note";

const Notes = ({dateKey}) => {
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('calendar-notes')) || {});
    const [noteInput, setNoteInput] = useState('');

    useEffect(() => {
        localStorage.setItem('calendar-notes', JSON.stringify(notes));
    }, [notes]);

    const handleSaveNote = () => {
        if(!noteInput.trim()) return;
        const newNotes = {...notes};
        if(!newNotes[dateKey]){
            newNotes[dateKey] = [];
        }
        newNotes[dateKey].push(noteInput.trim());
        setNotes(newNotes);
        setNoteInput('');
    };

    const handleRemoveNote = (noteIndex) => {
        const newNotes = {...notes};
        newNotes[dateKey].splice(noteIndex, 1);
        if(newNotes[dateKey].length === 0){
            delete newNotes[dateKey];
        }
        setNotes(newNotes);
    };

    const onRemove = index => ()=>handleRemoveNote(index);
    const onChange = (e)=>setNoteInput((e.target.value));

    return(
        <div className='notes-container'>
            {notes[dateKey] && notes[dateKey].map((note, index) => (
                <Note key={index} note={note} onRemove={onRemove(index)}/>
            ))}
            <div className='note-input'>
                <input
                    type='text'
                    value={noteInput}
                    placeholder="Add a note"
                    onChange={onChange}
                />
                <button onClick={handleSaveNote}>Save</button>
            </div>
        </div>
    );
}

export default Notes;