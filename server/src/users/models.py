import uuid
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from src.database import Base


class User(Base):
    '''User Model'''
    __tablename__ = 'User'

    # User id (UUID)
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # User email
    email = sa.Column(sa.String, index=True, nullable=False)

    # User hashed password
    password = sa.Column(sa.String, nullable=False)
