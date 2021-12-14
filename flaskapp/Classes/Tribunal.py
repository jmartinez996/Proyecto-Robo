# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
# db = SQLAlchemy(app)

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
    

    def __repr__(self):
        return f"<Nombre {self.id_tribunal}>"