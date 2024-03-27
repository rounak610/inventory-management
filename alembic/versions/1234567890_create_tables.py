"""create tables

Revision ID: 1234567890
Revises: 
Create Date: 2024-03-21 01:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1234567890'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create items table
    op.create_table('items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('item_id', sa.String(), nullable=True),
        sa.Column('item_name', sa.String(), nullable=True),
        sa.Column('status', sa.Boolean(), nullable=True),
        sa.Column('order_id', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Create orders table
    op.create_table('orders',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('item_id', sa.String(), nullable=True),
        sa.Column('student_id', sa.String(), nullable=True),
        sa.Column('student_name', sa.String(), nullable=True),
        sa.Column('issue_date', sa.DateTime(), nullable=True),
        sa.Column('return_date', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    # Drop orders table
    op.drop_table('orders')

    # Drop items table
    op.drop_table('items')
