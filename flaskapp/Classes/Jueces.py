from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import Date
from database import Base


class Jueces(Base):
    __tablename__ = 'jueces'

    id_juez = Column(Integer, primary_key=True)
    id_tribunal = Column(Integer)
    nombre_juez = Column(String())
    apellido_juez = Column(String())
    correo_juez = Column(String())

    def __repr__(self):
        return f"<Nombre {self.id_juez}>"