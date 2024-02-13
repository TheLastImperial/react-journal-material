import { deleteDoc, doc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { logoutFirebase, registerUserWithEmailPassword, singInWithEmailAndPwd, singInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, logout, login } from './';
import { deleteNoteById, setSaving } from '../journal';

export const checkingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
    }
}


export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ))

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if ( !result.ok ) return dispatch( logout( {errorMessage: result.errorMessage} ) );

        dispatch( login( result ))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const result = await singInWithEmailAndPwd({ email, password });
        if( !result.ok ) return dispatch(logout( result ));
        dispatch(login(result))
    };
};

export const startLogout = () =>{
    return async(dispatch)=> {
        const result = await logoutFirebase();
        dispatch(logout());
        dispatch(cleanNotesLogout());
    };
};

export const startDeletingNote = () => {
    return async(dispatch, getState)=>{
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { activeNote:note } = getState().journal
        const url = `${uid}/journal/notes/${ note.id}`;
        const docRef = doc(FirebaseDB, url);
        const resp = await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    };
};

