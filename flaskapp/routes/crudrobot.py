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

@routes.route('/testrobot') 
def testrobot(): 
    return {"mensaje":"saludo"}
    try:
        return ""

    except:
        return ""
    
@routes.route('/createRobot/', methods=['POST'])
@jwt_required()
def createRobot():
    current_user_id = get_jwt_identity()
    nombre = request.values['nombre']
    desc = request.values['descripcion']
    exe = request.values['ruta']
    tribunal = request.values['id_tribunal']
    area = request.values['id_area']
    print(desc)
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

# @routes.route('/deleteTribunal/', methods=['POST'])
# #@jwt_required()
# def deleteTribunal():
#     try:
#         return ""

#     except:
#         return ""
 


