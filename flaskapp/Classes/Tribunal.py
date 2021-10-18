from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

class Tribunal(db.Model):
    __tablename__ = 'tribunal'

    id_tribunal = db.Column(db.Integer, primary_key=True)
    id_area = db.Column(db.Integer)
    nombre = db.Column(db.String())
    fono = db.Column(db.String())
    

    def __repr__(self):
        return f"<Nombre {self.id_tribunal}>"