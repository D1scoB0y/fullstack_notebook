from sqlalchemy.orm import Session

from src.notes.schemas import CreateNote, NoteScheme, UpdateNote
from src.notes.models import Note
from src.utils import current_datetime
from src.users.service import get_user_by_id


def create_note(new_note: CreateNote, session: Session) -> NoteScheme | None:
    '''Creating a note. To create a note user should fill 1 field at least.
    title or text, or all fields'''

    if new_note.title == '' and new_note.text == '':
        return None
    
    # User checking
    if not get_user_by_id(new_note.owner_id, session):
        return None

    new_note = Note(**new_note.dict())

    session.add(new_note)
    session.commit()
    session.refresh(new_note)
    return NoteScheme.from_orm(new_note)


def get_notes(user_id: str, session: Session) -> list[NoteScheme]:
    '''Getting all notes by owner id'''

    notes = session.query(Note).filter_by(owner_id=user_id).all()

    return list(map(NoteScheme.from_orm, notes))


def get_note(note_id: str, session: Session) -> Note | None:
    '''Getting note by id'''
    return session.query(Note).filter_by(id=note_id).first()


def update_note(note: UpdateNote, session: Session) -> Note | None:
    '''Note updating'''

    note = get_note(note.id, session)

    if note is None:
        return None

    note.title = note.title # type: ignore
    note.text = note.text # type: ignore
    note.creation_date= current_datetime() # type: ignore

    session.commit()
    session.refresh(note)
    return note


def delete_note(note_id: str, session: Session) -> Note | None:
    '''Note deleting'''

    note_to_delete = get_note(note_id, session)

    if note_to_delete is None:
        return None

    session.delete(note_to_delete)
    session.commit()

    return note_to_delete
