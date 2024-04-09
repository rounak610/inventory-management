"""add_columns_to_items_table

Revision ID: 0987654321
Revises: 1234567890
Create Date: 2024-04-09 01:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0987654321'
down_revision: str = '1234567890'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add columns to items table
    op.add_column('items', sa.Column('total_quantity', sa.Integer(), nullable=True))
    op.add_column('items', sa.Column('available', sa.Integer(), nullable=True))


def downgrade() -> None:
    # Drop columns from items table
    op.drop_column('items', 'available')
    op.drop_column('items', 'total_quantity')
