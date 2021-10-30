
from operator import countOf
import re
from flask import Flask, jsonify, request, _app_ctx_stack
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt, set_access_cookies, unset_access_cookies
from sqlalchemy.orm import query, scoped_session
from Classes.Usuarios import User
#from Classes.Area import Area
#from Classes.Tribunal import Tribunal
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
import requests as req
from routes import *
from datetime import datetime, timedelta, timezone
from database import Base, SessionLocal, engine


app = Flask(__name__)

app.register_blueprint(routes)

app.config['JWT_SECRET_KEY'] = 'ywtg.9819'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
#app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config['UPLOAD_FOLDER'] = './Archivos'
# db = SQLAlchemy(app)

Base.metadata.create_all(engine)
session = SessionLocal()

jwt = JWTManager(app)
CORS(app)


@app.route('/') 
def index(): 
    return {"mensaje":"saludo"}

@app.route('/mensaje/', methods=['GET', 'POST'])
def mensaje():
    data = request.values['i']
    print(data)
    return "recibido"

@app.route('/login', methods=['POST'])
def login():
    rut = request.values['rut']
    contrasena = request.values['contrasena']
    try:
        usuario = session.query(User).filter_by(rut=rut).first()
        
        if usuario.rut == rut and checkph(usuario.contrasena, contrasena):
            access_token = create_access_token(identity=usuario.id_usuario)
            return jsonify(message="Usuario correcto.", token=access_token, id_usuario=usuario.id_usuario), 200
    except:
        return jsonify(message="Usuario o contrasena son incorrectos."), 400
    finally:
        session.close()
    
@app.route('/userState', methods=['GET'])
@jwt_required()
def userState():
    try:
        current_user_id = get_jwt_identity()
        user = session.query(User).filter_by(id_usuario=current_user_id).first()
        return jsonify({"id_usuario": user.id_usuario, "nombre": user.nombre}), 200
    except:
        return jsonify({'message':'No esta logeado'}), 422
    finally:
        session.close()

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
            session.add(new_user) 
            session.commit()
            return jsonify({'message':'Usuario Registrado con Exito'})
    except:
        return jsonify({'message':'No se pudo agregar el Usuario '+ nombre}), 422
    finally:
        session.close()

if __name__ == '__main__': 
    app.run(debug=True)     
