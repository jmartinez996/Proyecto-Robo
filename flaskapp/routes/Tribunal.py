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
    ciudad = request.values['ciudad']
    ip = request.values['ip']
    s_area = request.values['s_area']
    s_area = s_area.split(',')
    i_area = []
    for x in s_area:
        query = session.query(Area).filter_by(nombre_area=x).first()
        i_area.append(query.id_area)
    newTribunal = Tribunal(nombre=nombre,fono=fono,nombre_area=s_area,id_area=i_area,ciudad=ciudad, ip=ip)
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
    
    
