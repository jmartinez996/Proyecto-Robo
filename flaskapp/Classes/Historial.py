from sqlalchemy import Column, Integer, String, ARRAY, DateTime
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import Date
from database import Base

class Historial(Base):
    __tablename__ = 'historial'

    id_historial = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey('usuario.id_usuario'))
    id_robot = Column(Integer, ForeignKey('robots.id_robot'))
    estado_final = Column(Boolean)
    fecha = Column(DateTime())
    id_tribunal = Column(Integer, ForeignKey('tribunal.id_tribunal'))

    def __repr__(self):
        return f"<Nombre {self.id_historial}>"