from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String())
    apellido = db.Column(db.String())
    rut = db.Column(db.String())
    correo = db.Column(db.String())
    contrasena = db.Column(db.String())
    tipo_usuario = db.Column(db.Integer)
    id_area = db.Column(db.Integer) 
    id_tribunal = db.Column(db.Integer)

    def __repr__(self):
        return f"<Usuario {self.nombre}>"