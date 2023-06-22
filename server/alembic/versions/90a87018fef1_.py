"""empty message

Revision ID: 90a87018fef1
Revises: 87bed4cd7287
Create Date: 2023-05-12 23:28:12.454082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90a87018fef1'
down_revision = '87bed4cd7287'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('User', sa.Column('email', sa.String(), nullable=False))
    op.add_column('User', sa.Column('password', sa.String(), nullable=False))
    op.create_index(op.f('ix_User_email'), 'User', ['email'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_User_email'), table_name='User')
    op.drop_column('User', 'password')
    op.drop_column('User', 'email')
    # ### end Alembic commands ###