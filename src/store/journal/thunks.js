import {
    collection, doc, setDoc
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
    addEmptyNote, savingNewNote, setActiveNote,
    setNotes, setPhotosToActiveNote, setSaving,
    updateNote,
} from "./";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = ()=>{
    return async(dispatch, getState) =>{
        dispatch(savingNewNote())
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        };

        const newDoc = doc( collection(FirebaseDB, `${ uid }/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )
        // dispatch(activateNote)
    };
};

export const startLoadNotes = () =>{
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    };
};

export const startSavingNote = ()=>{
    return async(dispatch, getState)=>{
        dispatch(setSaving())
        const { uid } = getState().auth;
        const { activeNote:note } = getState().journal
        const path = `/${ uid }/journal/notes/${ note.id }`;
        const noteFirebase = { ...note };
        delete noteFirebase.id;
        const docRef = doc(FirebaseDB, path);
        await  setDoc(docRef, noteFirebase, { merge: true });
        dispatch(updateNote(note));
    };
};

export const startUpaloadingFiles = (files = []) =>{
    return async(dispatch)=>{
        dispatch(setSaving())
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    };
};
