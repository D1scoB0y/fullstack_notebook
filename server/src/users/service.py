import bcrypt
from sqlalchemy.orm import Session

from src.users.models import User
from src.users.schemas import AuthUser, ReadUser


def hash_password(password: str) -> str:
    '''Password hashing'''
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def check_password(password: str, hashed_password: str) -> bool:
    '''Checking the password hash'''
    return bcrypt.checkpw(password.encode(), hashed_password.encode())


def get_user_by_email(email: str, session: Session) -> User | None:
    '''Getting user by email'''
    return session.query(User).filter_by(email=email).first()


def get_user_by_id(id: str, session: Session) -> User | None:
    '''Getting user by id'''
    return session.query(User).filter_by(id=id).first()


def create_user(user_data: AuthUser, session: Session) -> ReadUser:
    '''Adding a user to the database.
    Returns the ReadUser schema'''

    new_user = User(
        email=user_data.email,
        password=hash_password(user_data.password)
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return ReadUser.from_orm(new_user)


def auth_user(email: str, password: str, session: Session) -> ReadUser | None:
    '''User authentication'''

    user = get_user_by_email(email, session)

    if user is None:
        return None
    
    if not check_password(password, str(user.password)):
        return None

    return ReadUser.from_orm(user)
