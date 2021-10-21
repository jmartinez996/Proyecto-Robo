from . import routes
from operator import countOf
import re
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_jwt_extended import get_jwt_identity, jwt_required
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
      
        fichero = {'file1': archivo}
        dataForm = {
            'correo': correo,
            'user_mixtos': user_mixtos,
            'pass_mixtos': pass_mixtos,
            'user_familia': user_familia,
            'pass_familia': pass_familia,
            'user_siagj': user_siagj,
            'pass_siagj': pass_siagj
        }
        resp = req.post('http://127.0.0.1:5001/',files=fichero, data=dataForm)
        #resp = req.get('http://127.0.0.1:5001/')
        print(resp.text)
        return ''
    except:
        return ''
    # print("Robot Ejecutado")
    # return jsonify({'message':'Robot ejecutado'})/


@routes.route('/upRobot') 
def upRobot(): 
    return {"mensaje":"Saludo Robot"}