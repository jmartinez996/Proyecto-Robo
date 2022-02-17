from . import routes
from flask import Flask, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.datastructures import ResponseCacheControl
from Classes.Usuarios import User
from Classes.Tribunal import Tribunal
import requests as req
from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/getUsers/<idT>', methods=['GET'])
@jwt_required()
def getUsers(idT):
    print('idT')
    # try:
    current_user_id = get_jwt_identity()
    query = session.query(User, Tribunal).join(Tribunal).filter(Tribunal.id_tribunal==idT).all()
    query_copy = query
    data = []
    for users, tribunal in query_copy:
        aux = {
                'id_usuario':users.id_usuario,
                'nombre':users.nombre,
                'apellido':users.apellido,
                'rut':users.rut,
                'correo':users.correo,
                'tribunal':tribunal.nombre
                }
        print(aux)
        data.append(aux)
    session.close()
    print("Entre")
    return jsonify({'message': data})


@routes.route('/deleteUser/', methods=['POST'])
@jwt_required()
def deleteUser():
    current_user_id = get_jwt_identity()
    id_us = request.values['id_usuario']    
    session.query(User).filter(User.id_usuario == id_us).delete()
    session.commit()
    print("eliminado")
    try:
        return ""

    except:
        return ""

@routes.route('/getUserbyId/<id>')
#@jwt_required()
def getUserbyId(id):
    #current_user_id = get_jwt_identity()
    print(id)
    sql = session.query(User).filter(User.id_usuario == id).all()
    data = []
    for usuario in sql:
        aux = {
            'role':usuario.tipo_usuario,
            'nombre':usuario.nombre,
            'apellido':usuario.apellido,
            'rut':usuario.rut,
            'correo':usuario.correo,
            'id_tribunal':usuario.id_tribunal
        }
        data.append(aux)
    session.close()
    return jsonify({'message':data})
    #return(id)

@routes.route('/updateUser/', methods=['POST'])
@jwt_required()
def updateUser():
    try:
        current_user_id = get_jwt_identity()
        id_usuario = request.values['id']
        nombre = request.values['nombre']
        apellido = request.values['apellido']
        rut = request.values['rut']
        correo = request.values['correo']
        tribunal = request.values['tribunal']
        tipo_usuario = request.values['tipo_usuario']
        old_data = session.query(User).get(id_usuario)
        old_data.nombre = nombre
        old_data.apellido = apellido
        old_data.rut = rut
        old_data.correo = correo
        old_data.tribunal = tribunal
        old_data.tipo_usuario = tipo_usuario
        session.merge(old_data)
        session.commit()  
        return {"mensaje":"saludo"}
    except:
        return ''
    finally:
        session.close()
        

@routes.route('/upusers')
def upusers():
    print("data")
    return jsonify({"data":"data"})

