from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.types import Date
from database import Base

class Robots(Base):
    __tablename__ = 'robots'

    id_robot = Column(Integer, primary_key=True)
    id_area = Column(Integer, ForeignKey('area.id_area'))
    nombre_robot = Column(String())
    desc_robot = Column(String())
    exe_robot = Column(String())
    estado_robot = Column(Integer)
    id_tribunal = Column(Integer, ForeignKey('tribunal.id_tribunal'))
    disponibilidad = Column(Boolean)
    id_juez = Column(Integer, ForeignKey('jueces.id_juez'))

    def __repr__(self):
        return f"<Nombre {self.id_robot}>"