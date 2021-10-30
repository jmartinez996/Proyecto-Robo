# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
# db = SQLAlchemy(app)

from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Date
from database import Base

# class User(db.Model):
#     __tablename__ = 'usuario'

#     id_usuario = db.Column(db.Integer, primary_key=True)
#     nombre = db.Column(db.String())
#     apellido = db.Column(db.String())
#     rut = db.Column(db.String())
#     correo = db.Column(db.String())
#     contrasena = db.Column(db.String())
#     tipo_usuario = db.Column(db.Integer)
#     id_area = db.Column(db.Integer) 
#     id_tribunal = db.Column(db.Integer)

#     def __repr__(self):
#         return f"<Usuario {self.nombre}>"

class User(Base):
    __tablename__ = 'usuario'

    id_usuario = Column(Integer, primary_key=True)
    nombre = Column(String())
    apellido = Column(String())
    rut = Column(String())
    correo = Column(String())
    contrasena = Column(String())
    tipo_usuario = Column(Integer)
    id_area = Column(Integer) 
    id_tribunal = Column(Integer)

    def __repr__(self):
        return f"<Usuario {self.nombre}>"