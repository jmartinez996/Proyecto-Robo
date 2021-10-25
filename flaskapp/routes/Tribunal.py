from flask import render_template
from . import routes
from operator import countOf
import re
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from sqlalchemy.orm import query
from sqlalchemy.sql import text
from werkzeug.datastructures import ResponseCacheControl
from Classes.Usuarios import User
from Classes.Area import Area
from Classes.Tribunal import Tribunal
from hashlib import md5
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
import requests as req


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost:5434/robot'
db = SQLAlchemy(app)

@routes.route('/createTribunal/', methods=['POST'])
@jwt_required()
def createTribunal():
    current_user_id = get_jwt_identity()
    nombre = request.values['nombre']
    fono = request.values['telefono']
    id_area = 1
    id_area_prueba = request.values['area']
    id_area_prueba = id_area_prueba.split(',')
    id_area_prueba = [int(i) for i in id_area_prueba]
    print(id_area_prueba)
    newTribunal = Tribunal(nombre=nombre,fono=fono,id_area=id_area,id_area_prueba=id_area_prueba)
    db.session.add(newTribunal) 
    db.session.commit()
    print("asd")
    return {"mensaje":"saludo"}

@routes.route('/updateTribunal/', methods=['POST'])
@jwt_required()
def updateTribunal():
    try:
        return ""

    except:
        return ""

@routes.route('/deleteTribunal/', methods=['POST'])
@jwt_required()
def deleteTribunal():
    
    try:
        return ""

    except:
        return ""
 

@routes.route('/upTribunal') 
def upTribunal(): 
    #current_user_id = get_jwt_identity()
    query = Tribunal.query.all()
    print(query)
    data = []
    
    for tribunal in query:
        aux = {
            'id_tribunal':tribunal.id_tribunal,
            'id_area':tribunal.id_area,
            'nombre':tribunal.nombre,
            'fono':tribunal.fono,
            'id_area_prueba':tribunal.id_area_prueba,
        }
        data.append(aux)
    return jsonify({'message': data})
    
    
    return {"mensaje":"saludo"}