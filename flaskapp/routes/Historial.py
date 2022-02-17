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

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/getHistorial', methods=['POST'])
@jwt_required()
def gethistorial():
    id_trib = request.values['id_tribunal']
    rs = session.execute("""select h.id_historial, u.nombre, u.apellido, u.correo, tr.nombre, r.nombre_robot, h.fecha, h.estado_final
                            from historial as h
                            join usuario as u on h.id_usuario = u.id_usuario
                            join tribunal as tr on h.id_tribunal = tr.id_tribunal
                            join robots as r on h.id_robot = r.id_robot
                            where h.id_tribunal = %s
                            order by h.fecha desc""" % (str(id_trib)))
    data = []
    for r in rs:
        aux = {
                'id_historial':r['id_historial'],
                'nombre_usuario':r['nombre'],
                'apellido_usuario':r['apellido'],
                'correo':r['correo'],
                'tribunal':r['nombre'],
                'nombre_robot':r['nombre_robot'],
                'fecha':str(r['fecha'].day)+'/'+str(r['fecha'].month)+'/'+str(r['fecha'].year),
                'estado_final':r['estado_final']
                }
        data.append(aux)
    session.close()
    return jsonify({'message': data})