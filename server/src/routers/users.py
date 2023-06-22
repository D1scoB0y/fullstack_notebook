from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.users.service import get_user_by_email, create_user, auth_user
from src.database import get_session
from src.users.schemas import AuthUser, ReadUser


router = APIRouter()


@router.post('/login', response_model=ReadUser)
def login(
        user_data: OAuth2PasswordRequestForm = Depends(),
        session: Session = Depends(get_session)
    ):
    '''User login. User must provide an email and password'''

    user_email = user_data.username # 'OAuth2PasswordRequestForm' object has no attribute 'email'
    user = auth_user(user_email, user_data.password, session)

    if user is None:
        raise HTTPException(status_code=401, detail='Invalid credentials')

    return user


@router.post('/registration', response_model=ReadUser)
def registration(
        user_data: AuthUser,
        session: Session = Depends(get_session)
    ):
    '''User registration. User must came up with email and password'''

    is_user_exist = get_user_by_email(user_data.email, session) is not None

    if is_user_exist:
        raise HTTPException(status_code=409, detail='This email is already taken')

    return create_user(user_data, session)
