import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from src.config import Config


Base = declarative_base()


def get_engine(db_url: str | None) -> sa.Engine|None:
    if db_url is None:
        raise ValueError('Database url is not defined. Add DB_URL option to config.py file.')
    
    return sa.create_engine(db_url)


# sqlalchemy engine
engine = get_engine(Config.DB_URL)


SesssionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_session():
    session = SesssionLocal()
    try:
        yield session
    finally:
        session.close()
