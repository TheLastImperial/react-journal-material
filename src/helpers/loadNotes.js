import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async(uid= '') => {
    const collect = collection(FirebaseDB, `${ uid }/journal/notes`);
    const notesDocs = await getDocs(collect);
    const notes = [];
    notesDocs.forEach(note => {
        notes.push({ id: note.id, ...note.data() })
    });
    return notes;
};
