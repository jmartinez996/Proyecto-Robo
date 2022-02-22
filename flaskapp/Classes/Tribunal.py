from sqlalchemy import Column, Integer, String, ARRAY
from sqlalchemy.types import Date
from database import Base

class Tribunal(Base):
    __tablename__ = 'tribunal'

    id_tribunal = Column(Integer, primary_key=True)
    nombre = Column(String())
    fono = Column(String())
    nombre_area = Column(ARRAY(String))
    id_area = Column(ARRAY(Integer))
    ciudad = Column(String())
    ip = Column(String())
    codigo_tribunal = Column(Integer)
    user_sitci = Column(String())
    pass_sitci = Column(String())
    

    def __repr__(self):
        return f"<Nombre {self.id_tribunal}>"