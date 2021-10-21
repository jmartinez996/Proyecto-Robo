
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
from routes import *
app = Flask(__name__)
app.register_blueprint(routes)
app.config['JWT_SECRET_KEY'] = 'ywtg.9819'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost:5434/robot'
app.config['UPLOAD_FOLDER'] = './Archivos'
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/') 
def index(): 
    return {"mensaje":"saludo"}
    
@app.route('/ejerobot', methods=['GET']) 
def ejerobot():
    # print("recibido en flask")
    # os.startfile(r"prueba.bat") 

    # new_user = User(nombre="usuario", apellido="prueba", rut="10259862-8", correo="prueba@prueba.com", contrasena="asdd", tipo_usuario=2, id_area=1) 
    # db.session.add(new_user) 
    # db.session.commit()
    return {"mensaje":"Ejecu"}

@app.route('/mensaje/', methods=['GET', 'POST'])
def mensaje():
    data = request.values['i']
    print(data)
    return "recibido"

@app.route('/login', methods=['POST'])
def login():
    rut = request.values['rut']
    contrasena = request.values['contrasena']
    print(rut)
    print(contrasena)
    try:
        usuario = User.query.filter_by(rut=rut).first()
        
        if usuario.rut == rut and checkph(usuario.contrasena, contrasena):
            access_token = create_access_token(identity=usuario.id_usuario)
            return jsonify(message="Usuario correcto.", token=access_token, id_usuario=usuario.id_usuario), 200
    except:
        return jsonify(message="Usuario o contrasena son incorrectos."), 400
    
@app.route('/userState', methods=['GET'])
@jwt_required()
def userState():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(id_usuario=current_user_id).first()
        return jsonify({"id_usuario": user.id_usuario, "nombre": user.nombre}), 200
    except:
        return jsonify({'message':'No esta logeado'}), 422

@app.route('/getUsers', methods=['GET'])
@jwt_required()
def getUsers():
    try:
        current_user_id = get_jwt_identity()
        query = User.query.all()
        data = []
        for users in query:
            aux = {
                    'id_usuario':users.id_usuario,
                    'nombre':users.nombre,
                    'apellido':users.apellido,
                    'rut':users.rut,
                    'correo':users.correo
                  }
            data.append(aux)
        return jsonify({'message': data})
    except:
        return jsonify({'message':'No esta logeado'}), 422
'''
@app.route('/getAreas', methods=['GET'])
@jwt_required()
def getAreas():
    try:
        current_user_id = get_jwt_identity()
        query = Area.query.all()
        data = []
        for areas in query:
            aux = {
                    'id_area':areas.id_area,
                    'nombre_area':areas.nombre_area,
                  }
            data.append(aux)
        return jsonify({'message': data})
    except:
        return jsonify({'message':'Error mostrando areas'}), 422
'''
@app.route('/agregauser/', methods=['POST'])
@jwt_required()
def agregauser():
    try:
        current_user_id = get_jwt_identity()
        nombre = request.values['nombre']
        apellido = request.values['apellido']
        rut = request.values['rut']
        correo = request.values['correo']
        contrasena = request.values['contrasena']
        repcontrasena = request.values['repcontrasena']
        if contrasena != repcontrasena:
            return jsonify({'message':'Contrasenas no coinciden'}),422
        else:
            contrasena = genph(contrasena)
            new_user = User(nombre=nombre, apellido=apellido, rut=rut, correo=correo, contrasena=contrasena, tipo_usuario=2, id_area=1, id_tribunal=1) 
            db.session.add(new_user) 
            db.session.commit()
            return jsonify({'message':'Usuario Registrado con Exito'})
    except:
        return jsonify({'message':'No se pudo agregar el Usuario '+ nombre}), 422

'''@app.route('/agregaarea/', methods=['POST'])
@jwt_required()
def agregaarea():
    try:
        current_user_id = get_jwt_identity()
        nombre_area = request.values['nombre_area']
        if nombre_area != '':
            new_area = Area(nombre_area=nombre_area)
            
            db.session.add(new_area) 
            db.session.commit()
            print(new_area)
            data = {
                'id_area' : new_area.id_area,
                'nombre_area' : new_area.nombre_area
            }
            return jsonify({
                'message': data
                })
        else:
            return jsonify({'message':'No se pudo agregar'}), 422
    except:
        return ''
'''
@app.route('/agregatribunal/', methods=['POST'])
@jwt_required()
def agregatribunal():
    try:
        current_user_id = get_jwt_identity()
        nombre_tribunal = request.values['nombre_tribunal']
        fono = request.values['telefono_tribunal']
        print(nombre_tribunal)
        return jsonify({'message':'Se recibio'})
    except:
        return jsonify({'message':'No se puedo agregar Tribunal'})

'''@app.route('/ejecutaRobot/', methods=['POST'])
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
    print("Robot Ejecutado")
    return jsonify({'message':'Robot ejecutado'})'''

if __name__ == '__main__': 
    app.run(debug=True)     
