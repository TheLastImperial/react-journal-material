import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {
  const { isSaving, activeNote } = useSelector(state => state.journal);
  const dispatch = useDispatch();
  const newNote = () => {
    dispatch(startNewNote())
  };

  return (
    <JournalLayout>

      {
        activeNote ?
        <NoteView />
        : <NothingSelectedView />
      }

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={ isSaving }
        onClick={ newNote }
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
