"""create measurements table

Revision ID: 0001_create_measurements
Revises: 
Create Date: 2026-10-15 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_create_measurements'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'measurements',
        sa.Column('id', sa.String(), primary_key=True, nullable=False),
        sa.Column('timestamp', sa.DateTime(), nullable=False),
        sa.Column('type', sa.String(), nullable=False),
        sa.Column('value', sa.Float(), nullable=False),
        sa.Column('unit', sa.String(), nullable=True),
        sa.Column('metadata', sa.JSON(), nullable=True),
        sa.Column('synced', sa.Boolean(), nullable=True, server_default=sa.text('0')),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now()),
    )


def downgrade():
    op.drop_table('measurements')
