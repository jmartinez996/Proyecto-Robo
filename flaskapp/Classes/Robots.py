from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

class Robots(db.Model):
    __tablename__ = 'robots'

    id_robot = db.Column(db.Integer, primary_key=True)
    id_area = db.Column(db.Integer)
    nombre_robot = db.Column(db.String())
    desc_robot = db.Column(db.String())
    exe_robot = db.Column(db.String())
    estado_robot = db.Column(db.Integer)
    id_tribunal = db.Column(db.Integer)

    def __repr__(self):
        return f"<Nombre {self.id_robot}>"