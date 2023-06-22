from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session

from src.database import get_session
from src.notes.schemas import CreateNote, NoteScheme, UpdateNote
from src.notes.sevice import create_note, get_notes, delete_note, get_note, update_note


router = APIRouter()


@router.post('/note', response_model=NoteScheme)
def note_add(
        note: CreateNote,
        session: Session = Depends(get_session),
    ) -> NoteScheme | HTTPException:
    '''Creating a note'''

    new_note = create_note(note, session)

    if new_note is None:
        raise HTTPException(status_code=400, detail='To create a note user should fill 1 field at least.')

    return new_note


@router.get('/note/{note_id}', response_model=NoteScheme)
def note_read(
        note_id: str,
        session: Session = Depends(get_session),
    ):



    return get_note(note_id, session)


@router.put('/note')
def note_update(
        note: UpdateNote,
        session: Session = Depends(get_session),
    ):

    update_note(note, session)
    return {'status': 'ok'}


@router.get('/notes', response_model=list[NoteScheme]) 
def notes(
        user_id: str,
        session: Session = Depends(get_session)
    ):
    return get_notes(user_id, session)


@router.delete('/note/{note_id}', status_code=204)
def note_delete(note_id: str, session: Session = Depends(get_session)):
    delete_note(note_id, session)
