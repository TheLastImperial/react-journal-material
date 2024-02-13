import {
    DeleteOutline,
    SaveOutlined, UploadOutlined
} from '@mui/icons-material';
import {
    Button, Grid,
    IconButton,
    TextField, Typography
} from '@mui/material';
import {
    ImageGallery
} from '../components'
import {
    useDispatch, useSelector
} from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {
    useEffect, useMemo, useRef
} from 'react';
import {
    setActiveNote, startSavingNote, startUpaloadingFiles
} from '../../store/journal';
import Swal from 'sweetalert2';
import { startDeletingNote } from '../../store/auth';


export const NoteView = () => {
    const dispatch = useDispatch();
    const {
        activeNote, isSaving,
        messageSaved
    } = useSelector(state => state.journal );
    const { title, body, date,
        onInputChange, formState
    } = useForm( activeNote );

    const dateString = useMemo(()=> {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);
    const inputFileRef = useRef();

    useEffect(()=>{
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(()=>{
        if(messageSaved.length > 0){
            Swal.fire({
                title: 'Info',
                text: messageSaved,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        };
    }, [messageSaved])

    const onClick = ()=>{
        dispatch(startSavingNote());
    };
    const onFileChange = ({ target }) => {
        if(target.files == 0)
            return;
        dispatch(startUpaloadingFiles(target.files));
    };

    const onDeleteNote = ()=>{
        dispatch(startDeletingNote())
    };
    return (
        <Grid container direction='row'
                justifyContent='space-between'
                alignItems='center' sx={{ mb: 1 }}
            >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input type="file"
                    multiple
                    ref = { inputFileRef }
                    onChange={ onFileChange }
                    style={{ display: 'none' }}/>

                <IconButton
                    disabled={ isSaving }
                    color="primary"
                    onClick={ () => inputFileRef.current.click() }>
                    <UploadOutlined/>
                </IconButton>
                <Button color="primary" sx={{ padding: 2 }}
                    onClick={ onClick }
                    disabled={ isSaving }>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                    name = "title"
                    onChange = { onInputChange }
                    value = { title }
                />

                <TextField 
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={ 5 }
                    name = "body"
                    onChange = { onInputChange }
                    value = { body }
                />
            </Grid>
            <Grid container justifyContent={'end'}
            >
                <Button onClick={ onDeleteNote }
                sx={{ mt: 2 }}
                color="error">
                    <DeleteOutline/>
                    Borrar
                </Button>
            </Grid>
            {/* Image gallery */}
            <ImageGallery images={ activeNote.imageUrls }/>

        </Grid>
  )
};
