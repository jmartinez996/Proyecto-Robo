from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

class Area(db.Model):
    __tablename__ = 'area'

    id_area = db.Column(db.Integer, primary_key=True)
    nombre_area = db.Column(db.String()) 

    def __repr__(self):
        return f"<id_area {self.id_area}>"