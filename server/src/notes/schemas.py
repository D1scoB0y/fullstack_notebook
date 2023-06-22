import datetime as dt
from pydantic import BaseModel
from typing import Any


class NoteScheme(BaseModel):
    id: Any
    title: str
    text: str
    creation_date: dt.datetime
    owner_id: Any

    class Config:
        orm_mode = True


class UpdateNote(BaseModel):
    id: str
    title: str
    text: str


class CreateNote(BaseModel):
    owner_id: str
    title: str
    text: str

    class Config:
        orm_mode = True
