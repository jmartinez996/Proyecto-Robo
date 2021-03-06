from . import routes
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from Classes.Usuarios import User
import requests as req
from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/getUsers', methods=['GET'])
@jwt_required()
def getUsers():
    # try:
    current_user_id = get_jwt_identity()
    query = session.query(User).all()
    query_copy = query
    data = []
    for users in query_copy:
        aux = {
                'id_usuario':users.id_usuario,
                'nombre':users.nombre,
                'apellido':users.apellido,
                'rut':users.rut,
                'correo':users.correo
                }
        data.append(aux)
    session.close()
    return jsonify({'message': data})
    # except:
    #      return jsonify({'message':'No esta logeado'}), 422
        