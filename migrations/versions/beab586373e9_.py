"""empty message

Revision ID: beab586373e9
Revises: 0ee424f5f5a7
Create Date: 2019-03-28 15:21:06.569986

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'beab586373e9'
down_revision = '0ee424f5f5a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'dbdetail', ['db_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'dbdetail', type_='unique')
    # ### end Alembic commands ###
