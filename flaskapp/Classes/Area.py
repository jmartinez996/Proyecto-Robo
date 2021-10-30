# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
# db = SQLAlchemy(app)

from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Date
from database import Base

class Area(Base):
    __tablename__ = 'area'

    id_area = Column(Integer, primary_key=True)
    nombre_area = Column(String()) 

    def __repr__(self):
        return f"<id_area {self.id_area}>"