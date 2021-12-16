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

@routes.route('/getUsers', methods=['GET'])
@jwt_required()
def getUsers():
    # try:
    current_user_id = get_jwt_identity()
    query = session.query(User, Tribunal).join(Tribunal).all()
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
    # except:
    #      return jsonify({'message':'No esta logeado'}), 422


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
            'role':usuario.tipo_usuario
        }
        data.append(aux)
    session.close()
    return jsonify({'message':data})
    #return(id)
    
@routes.route('/upusers')
def upusers():
    print("data")
    return jsonify({"data":"data"})

