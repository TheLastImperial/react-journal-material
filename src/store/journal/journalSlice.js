import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: "journalSlice",
    initialState:{
        isSaving: false,
        notes: [],
        activeNote: null,
        messageSaved: '',
    },
    reducers:{
        savingNewNote: (state, { payload }) => {
            state.isSaving = true;
        },
        addEmptyNote: (state, { payload } /* action */) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload } /* action */)=>{
            state.activeNote = payload;
            state.messageSaved = '';
        },
        setNotes: (state, { payload })=>{
            state.notes = payload;
        },
        setSaving: (state, action)=>{
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, { payload })=>{
            state.notes = state.notes.map(note =>{
                if(note.id === payload.id){
                    return payload;
                }
                return note;
            });
            state.isSaving = false;
            state.messageSaved = `${ payload.title } se ha actualizado correctamente.`
        },
        setPhotosToActiveNote: (state, { payload }) => {
            state.activeNote.imageUrls = [
                ...state.activeNote.imageUrls, ...payload,
            ];
            state.isSaving = false;
        },
        cleanNotesLogout: (state)=>{
            state.isSaving= false;
            state.notes= [];
            state.activeNote= null;
            state.messageSaved= '';
        },
        deleteNoteById: (state, { payload })=>{
            state.activeNote = null;
            state.notes = state.notes.filter(note => note.id !== payload);
            state.messageSaved = 'Se ha eliminado la nota.';
        },
    }
});

export const {
    savingNewNote,
    addEmptyNote, setActiveNote,
    setNotes, setSaving, updateNote,
    setPhotosToActiveNote,
    cleanNotesLogout,
    deleteNoteById,
} = journalSlice.actions;
