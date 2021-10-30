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

from Classes.Robots import Robots

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost:5434/robot'
db = SQLAlchemy(app)

@routes.route('/testrobot') 
def testrobot(): 
    return {"mensaje":"saludo"}
    try:
        return ""

    except:
        return ""
@routes.route('/getRobot')
#@jwt_required()
def getRobot():
    #return {"mensaje": "Saludos"}
    query = Robots.query.all()
    print(query)
    data = []
    for robots in query:
        aux = {
            'id_robot':robots.id_robot,
            'id_area':robots.id_area,
            'nombre_robot':robots.nombre_robot,
            'desc_robot':robots.desc_robot,
            'exe_robot':robots.exe_robot,
            'estado_robot':robots.estado_robot,
            'id_tribunal': robots.id_tribunal,
        }
        data.append(aux)
    return jsonify({'message': data})
@routes.route('/createRobot/', methods=['POST'])
@jwt_required()
def createRobot():
    current_user_id = get_jwt_identity()
    nombre = request.values['nombre']
    #print(nombre)
    desc = request.values['descripcion']
    exe = request.values['ruta']
    tribunal = request.values['id_tribunal']
    area = request.values['id_area']
    estado = 0
    new_Robot = Robots(id_area=area,nombre_robot=nombre, desc_robot = desc, exe_robot = exe, estado_robot = estado, id_tribunal = tribunal)
    db.session.add(new_Robot) 
    db.session.commit()
    #print("Agregado")
    try:
        return ""
    except:
        return ""
    finally:
        db.session.close()
    

# @routes.route('/updateTribunal/', methods=['POST'])
# #@jwt_required()
# def updateTribunal():
#     try:
#         return ""

#     except:
#         return ""

@routes.route('/deleteRobot/', methods=['POST'])
@jwt_required()
def deleteRobot():
    current_user_id = get_jwt_identity()
    id_R = request.values['id_robot']
    db.session.query(Robots).filter(Robots.id_robot == id_R).delete()
    db.session.commit()
    try:
        return ""

    except:
       return ""
    return "hola"


