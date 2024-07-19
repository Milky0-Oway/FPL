import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Note = {
    currencyId: string;
    title: string;
    body: string;
}

type NotesState = {
    notes: Note[];
}

const initialState: NotesState = {
    notes: [],
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const existingNoteIndex = state.notes.findIndex(note => note.currencyId === action.payload.currencyId);
            if (existingNoteIndex >= 0) {
                state.notes[existingNoteIndex] = action.payload;
            }
            else {
                state.notes.push(action.payload);
            }
        },
    },
});

export const {addNote} = notesSlice.actions;
export default notesSlice.reducer;