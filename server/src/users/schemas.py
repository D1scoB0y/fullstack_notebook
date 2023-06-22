from typing import Any

from pydantic import BaseModel


class ReadUser(BaseModel):
    id: Any
    email: str

    class Config:
        orm_mode = True


class AuthUser(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True
