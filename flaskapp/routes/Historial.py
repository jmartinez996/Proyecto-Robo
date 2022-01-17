from sys import excepthook
from . import routes
from flask import Flask, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.datastructures import ResponseCacheControl
from Classes.Usuarios import User
from Classes.Tribunal import Tribunal
from Classes.Historial import Historial
from Classes.Robots import Robots
import requests as req
from database import Base, SessionLocal, engine
from sqlalchemy import desc

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/getHistorial', methods=['POST'])
@jwt_required()
def gethistorial():
    id_trib = request.values['id_tribunal']
    query = session.query(Historial, User, Tribunal, Robots).filter(Historial.id_usuario == User.id_usuario).filter(Historial.id_tribunal==id_trib).filter(Historial.id_robot==Robots.id_robot).order_by(desc(Historial.fecha)).all()
    data = []
    for historial, users, tribunal, robots in query:
        aux = {
                'id_historial':historial.id_historial,
                'nombre_usuario':users.nombre,
                'apellido_usuario':users.apellido,
                'correo':users.correo,
                'tribunal':tribunal.nombre,
                'nombre_robot':robots.nombre_robot,
                'fecha':str(historial.fecha.day)+'/'+str(historial.fecha.month)+'/'+str(historial.fecha.year),
                'estado_final':historial.estado_final
                }
        data.append(aux)
    session.close()
    return jsonify({'message': data})