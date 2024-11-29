"""Criar tabela de denúncias

Revision ID: 5fe37376019b
Revises: e49e345322ed
Create Date: 2024-11-28 17:52:59.107018

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5fe37376019b'
down_revision = 'e49e345322ed'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('denuncia',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('titulo', sa.String(length=100), nullable=False),
    sa.Column('descricao', sa.Text(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.Column('usuario_id', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('usuario', schema=None) as batch_op:
        batch_op.alter_column('nome',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.alter_column('senha',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('usuario', schema=None) as batch_op:
        batch_op.alter_column('senha',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('nome',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)

    op.drop_table('denuncia')
    # ### end Alembic commands ###
