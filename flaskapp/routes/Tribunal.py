from . import routes
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.datastructures import ResponseCacheControl
from Classes.Area import Area
from Classes.Tribunal import Tribunal
import requests as req
from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/createTribunal/', methods=['POST'])
@jwt_required()
def createTribunal():
    current_user_id = get_jwt_identity()
    nombre = request.values['nombre']
    fono = request.values['telefono']
    id_area = 1
    id_area_prueba = request.values['area']
    id_area_prueba = id_area_prueba.split(',')
    #id_area_prueba = [int(i) for i in id_area_prueba]
    print(id_area_prueba)
    newTribunal = Tribunal(nombre=nombre,fono=fono,id_area=id_area,nombre_area=id_area_prueba)
    session.add(newTribunal) 
    session.commit()
    session.close()
    return {"mensaje":"saludo"}

@routes.route('/updateTribunal/', methods=['POST'])
@jwt_required()
def updateTribunal():
    try:
        return ""

    except:
        return ""

@routes.route('/deleteTribunal/', methods=['POST'])
@jwt_required()
def deleteTribunal():
    id_t = request.values['id_tribunal']
    current_user_id = get_jwt_identity()
    session.query(Tribunal).filter(Tribunal.id_tribunal == id_t).delete()
    session.commit()
    print("Eliminar id: "+id_t)
    print("llegue")
    try:
        return ""

    except:
        return ""
 

@routes.route('/getTribunal') 
@jwt_required()
def getTribunal(): 
    current_user_id = get_jwt_identity()
    quer = session.query(Tribunal).all()
    query_cop = quer
    data = []
    
    for tribunal in query_cop:
        aux = {
            'id_tribunal':tribunal.id_tribunal,
            'id_area':tribunal.id_area,
            'nombre':tribunal.nombre,
            'fono':tribunal.fono,
            'nombre_area':tribunal.nombre_area,
        }
        data.append(aux)
    session.close()
    return jsonify({'message': data})

@routes.route('/getTribunalId', methods = ["POST"])
#@jwt_required()
def getTribunalId():
    print("Entre")
    #current_user_id = get_jwt_identity()
    id_t = request.values['id']
    quer = session.query(Tribunal).get(id_t)
    aux = {
        'id_tribunal':quer.id_tribunal,
        'id_area':quer.id_area,
        'nombre':quer.nombre,
        'fono':quer.fono,
        'nombre_area':quer.nombre_area,
    }
    session.close()
    return aux
    try:
        return ""

    except:
        return ""
    
    
