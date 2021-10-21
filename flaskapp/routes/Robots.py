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
from werkzeug.datastructures import ResponseCacheControl
from Classes.Usuarios import User
from Classes.Area import Area
from hashlib import md5
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
import requests as req

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './Archivos'

@routes.route('/ejecutaRobot/', methods=['POST'])
@jwt_required()
def ejecutaRobot():
    try:
        current_user_id = get_jwt_identity()
        correo = request.values['correo']
        user_mixtos = request.values['user_mixtos']
        pass_mixtos = request.values['pass_mixtos']
        user_familia = request.values['user_familia']
        pass_familia = request.values['pass_familia']
        user_siagj = request.values['user_siagj']
        pass_siagj = request.values['pass_siagj']
        archivo = request.files['archivo']
      
        archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],'resumen.xls'))
        #fichero = {'file1': open('Archivos/resumen.xls', 'rb')}
        # resp = req.post('http://127.0.0.1:5001/eje/',files=fichero)
        resp = req.get('http://127.0.0.1:5001/')
        print(resp.json())
        return ''
    except:
        return ''
    # print("Robot Ejecutado")
    # return jsonify({'message':'Robot ejecutado'})/


@routes.route('/upRobot') 
def upRobot(): 
    return {"mensaje":"Saludo Robot"}