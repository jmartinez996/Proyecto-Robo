from sqlalchemy import Column, Integer, String
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.types import Date
from database import Base

class User(Base):
    __tablename__ = 'usuario'

    id_usuario = Column(Integer, primary_key=True)
    nombre = Column(String())
    apellido = Column(String())
    rut = Column(String())
    correo = Column(String())
    contrasena = Column(String())
    tipo_usuario = Column(String())
    id_area = Column(Integer) 
    id_tribunal = Column(Integer, ForeignKey('tribunal.id_tribunal'))

    def __repr__(self):
        return f"<Usuario {self.nombre}>"