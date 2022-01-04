from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

class Historial(db.Model):
    __tablename__ = 'historial'

    id_historial = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer)
    id_robot = db.Column(db.Integer)
    estado_final = db.Column(db.String())
    fecha = db.Column(db.DateTime())

    def __repr__(self):
        return f"<Nombre {self.id_historial}>"