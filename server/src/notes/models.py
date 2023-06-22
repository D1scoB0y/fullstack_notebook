import uuid

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from src.utils import current_datetime
from src.database import Base


class Note(Base):
    '''Note model'''
    __tablename__ = 'Note'

    # Note id
    id = sa.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Note title
    title = sa.Column(sa.String, nullable=False)

    # Note text
    text = sa.Column(sa.String, nullable=False)

    # Note creation data
    creation_date = sa.Column(sa.DateTime, default=current_datetime)

    # Note owner id
    owner_id = sa.Column(UUID(as_uuid=True), sa.ForeignKey('User.id'))
