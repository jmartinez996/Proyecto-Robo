from . import routes
from operator import countOf
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests as req
from sqlalchemy import and_
from Classes.Robots import Robots
from database import Base, SessionLocal, engine
from flask_mail import Message
from app import mail

Base.metadata.create_all(engine)
session = SessionLocal()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './Archivos'

@routes.route('/ejecutaRobotResMens/', methods=['POST'])
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
        id_tribunal = request.values['id_tribunal']
        id_robot = request.values['id_robot']
        
        fichero = {'file1': archivo}
        dataForm = {
            'correo': correo,
            'user_mixtos': user_mixtos,
            'pass_mixtos': pass_mixtos,
            'user_familia': user_familia,
            'pass_familia': pass_familia,
            'user_siagj': user_siagj,
            'pass_siagj': pass_siagj,
            'id_robot': id_robot,
            'id_tribunal': id_tribunal
        } 
        resp = req.post('http://127.0.0.1:5001/',files=fichero, data=dataForm)
        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(False)})
        session.commit()
        return ''
    except:
        return ''
    finally:
        session.close()
    # print("Robot Ejecutado")
    # return jsonify({'message':'Robot ejecutado'})/

@routes.route('/stateRobotResMens/', methods=['POST', 'GET'])
def stateRobot():
    try:
        estado = request.values['i']
        id_robot = request.values['id_robot']
        id_tribunal = request.values['id_tribunal']
        correo = request.values['correo']
        file_name = request.values['file_name']
        
        archivo = request.files['archivo']
        archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file_name))

        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(True)})
        session.commit()

        msg = Message('RPA: Resumen Mensual ejecutado con éxito-', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
        msg.body = "Se adjunta a este correo un excel con el resultado."
        with routes.open_resource('../Archivos/'+file_name) as fp:  
            msg.attach(file_name,'application/vnd.ms-excel',fp.read())  
        mail.send(msg)

    except:
        print('no se pudo enviar nada')
        return ''
    finally:
        session.close()
        return ''


@routes.route('/upRobot') 
def upRobot(): 
    return {"mensaje":"Saludo Robot"}