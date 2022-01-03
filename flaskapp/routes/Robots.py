from sqlalchemy.sql.functions import current_user
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
from Classes.Jueces import Jueces
from Classes.Historial import Historial
from database import Base, SessionLocal, engine
from flask_mail import Message
from app import mail
from datetime import datetime

Base.metadata.create_all(engine)
session = SessionLocal()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './Archivos'

####################### ESTADOS MENSUALES #########################

@routes.route('/ejecutaRobotResMens/', methods=['POST'])
@jwt_required()
def ejecutaRobotResMens():
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
        ip = request.values['ip']
        
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
            'id_tribunal': id_tribunal,
        } 
        resp = req.post('http://'+ip+':5001/ExeResMens/',files=fichero, data=dataForm)
        # session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(False)})
        # session.commit()
        return ''
    except:
        return ''
    finally:
        session.close()
        return 'Proceso Finaliado.'

@routes.route('/stateRobotResMens/', methods=['POST', 'GET'])
def stateRobotResMens():
    try:
        estado = request.values['estado']
        id_robot = request.values['id_robot']
        id_tribunal = request.values['id_tribunal']
        correo = request.values['correo']
        file_name = request.values['file_name']
        
        archivo = request.files['archivo']
        archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file_name))

        if estado == 'error':
            msg = Message('RPA: Hubo un error ejecutando Resumen Mensual', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
            msg.body = "Pruebe revisando la plantilla para verificar que corresponda con los requerimientos establecidos."
            mail.send(msg)

        if estado == 'success':
            msg = Message('RPA: Resumen Mensual ejecutado con éxito-', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
            msg.body = "Se adjunta a este correo un excel con el resultado."
            with routes.open_resource('../Archivos/'+file_name) as fp:  
                msg.attach(file_name,'application/vnd.ms-excel',fp.read())  
            mail.send(msg)
        
    except:
        print('no se pudo enviar nada')
        return ''
    finally:
        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(True)})
        session.commit()
        session.close()
        return 'Proceso Finalizado'

####################### GESTION DE SII #########################

@routes.route('/ejecutaRobotGestSii/', methods=['POST'])
@jwt_required()
def ejecutaRobotGestSii():
    try:
        current_user_id = get_jwt_identity()
        correo = request.values['correo']
        user_sii = request.values['user_sii']
        pass_sii = request.values['pass_sii']
        archivo = request.files['archivo']
        id_tribunal = request.values['id_tribunal']
        id_robot = request.values['id_robot']
        ip = request.values['ip']
        
        fichero = {'file1': archivo}
        dataForm = {
            'correo': correo,
            'user_sii': user_sii,
            'pass_sii': pass_sii,
            'id_robot': id_robot,
            'id_tribunal': id_tribunal
        } 
        resp = req.post('http://'+ip+':5001/ExeGestSii/',files=fichero, data=dataForm)
        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(False)})
        session.commit()
        return ''
    except:
        return ''
    finally:
        session.close()
        return 'Proceso Finalizado.'

@routes.route('/stateRobotGestSii/', methods=['POST', 'GET'])
def stateRobotGestSii():
    try:

        estado = request.values['estado']
        id_robot = request.values['id_robot']
        id_tribunal = request.values['id_tribunal']
        correo = request.values['correo']
        file_name = request.values['file_name']

        print(estado)
        
        archivo = request.files['archivo']
        archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file_name))

        if estado == 'error':
            msg = Message('RPA: Hubo un error ejecutando Gestión de SII.', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
            msg.body = "Pruebe revisando la plantilla para verificar que corresponda con los requerimientos establecidos."
            mail.send(msg)
        
        if estado == 'success':
            msg = Message('RPA: Gestión de SII ejecutado con Éxito.', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
            msg.body = "Se adjunta a este correo un archivo comprimido con el resultado."
            with routes.open_resource('../Archivos/'+file_name) as fp:  
                msg.attach(file_name,'application/zip',fp.read())  
            mail.send(msg)
 
    except:
        print('no se pudo enviar nada')
        return ''
    finally:
        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(True)})
        session.commit()
        session.close()
        return 'Proceso finalizado'
        # 

################################# INGRESO DE EXHORTOS ######################################

@routes.route('/ejecutaIngresoExhorto/', methods=['POST'])
@jwt_required()
def setJuezIngresoExhorto():
    try:
        current_user_id = get_jwt_identity()
        user_sitci = request.values['user_sitci']
        pass_sitci = request.values['pass_sitci']
        id_tribunal = request.values['id_tribunal']
        id_robot = request.values['id_robot']
        id_juez = request.values['id_juez']
        ip = request.values['ip']
        correo = request.values['correo']

        query = session.query(Jueces).filter_by(id_juez=id_juez).first()

        dataForm = {
            'user_sitci': user_sitci,
            'pass_sitci': pass_sitci,
            'id_tribunal': id_tribunal,
            'id_robot': id_robot,
            'juez':query.apellido_juez + ', ' + query.nombre_juez,
            'correo':correo,
            'id_usuario':current_user_id
        } 

        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(False)})
        session.commit()
        resp = req.post('http://'+ip+':5001/ExeIngresoExhorto/', data=dataForm)
        print(dataForm)

        return ''
    except:
        print('no se pudo enviar nada')
        return 'Hubo un problema'
    finally:
        session.close()
        return 'Proceso finalizado.'

@routes.route('/stateRobotIngresoExhorto/', methods=['POST', 'GET'])
def stateRobotIngresoExhorto():
    try:
        id_robot = request.values['id_robot']
        id_tribunal = request.values['id_tribunal']
        correo = request.values['correo']
        estado = request.values['estado']
        rits = request.values['rits']
        id_usuario = request.values['id_usuario']

        if estado == 'error':
            msg = Message('RPA: Hubo un problema ejecutando Ingreso de exhortos.', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
            if rits != "":
                msg.body = "Los ingresos de exhortos que se pudieron realizar son: " + rits[1:]
            else:
                msg.body = "No se pudo realizar ningún exhorto."
            mail.send(msg)
            new_register = Historial(id_usuario=id_usuario, id_robot=id_robot, estado_final=False, fecha=datetime.today().strftime('%Y-%m-%d %H:%M'), id_tribunal=id_tribunal)
            session.add(new_register) 
            session.commit()
        
        if estado == 'success':
            msg = Message('RPA: Ingreso de Exhortos se ha ejecutado con éxito.', sender = 'sgc_pucon@pjud.cl', recipients = [correo])
            msg.body = "Los Ingresos de exhorto que se realizaron son: " + rits[1:]
            mail.send(msg)
            
            new_register = Historial(id_usuario=id_usuario, id_robot=id_robot, estado_final=True, fecha=datetime.today().strftime('%Y-%m-%d %H:%M'), id_tribunal=id_tribunal)
            session.add(new_register) 
            session.commit()
    except:
        print('no se pudo enviar nada')
        new_register = Historial(id_usuario=id_usuario, id_robot=id_robot, estado_final=False, fecha=datetime.today().strftime('%Y-%m-%d %H:%M'), id_tribunal=id_tribunal)
        session.add(new_register) 
        session.commit()
        return 'Hubo un problema'
    finally:
        print('se cambia a true')
        session.query(Robots).filter(and_(Robots.id_tribunal==id_tribunal, Robots.id_robot==id_robot)).update({'disponibilidad':(True)})
        session.commit()
        session.close()
        return 'Proceso finalizado.'

####################### ------------- #########################


@routes.route('/upRobot') 
def upRobot(): 
    return {"mensaje":"Saludo Robot"}