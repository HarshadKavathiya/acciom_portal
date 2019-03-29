"""empty message

Revision ID: 96b391e9f135
Revises: 60bf56cfdee8
Create Date: 2019-03-28 23:25:58.858060

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '96b391e9f135'
down_revision = '60bf56cfdee8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'test_case', 'dbdetail', ['src_connection_id'], ['db_id'])
    op.drop_column('test_case', 'target_connection_id')
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.drop_index('email', table_name='user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('email', 'user', ['email'], unique=True)
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.add_column('test_case', sa.Column('target_connection_id', mysql.INTEGER(display_width=10, unsigned=True), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'test_case', type_='foreignkey')
    # ### end Alembic commands ###
