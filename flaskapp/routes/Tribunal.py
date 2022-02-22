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
    codigo_tribunal = request.values['codigo_tribunal']
    s_area = request.values['s_area']
    user_sitci = request.values['user_sitci']
    pass_sitci = request.values['pass_sitci']
    s_area = s_area.split(',')
    i_area = []
    for x in s_area:
        query = session.query(Area).filter_by(nombre_area=x).first()
        i_area.append(query.id_area)
    newTribunal = Tribunal(nombre_tribunal=nombre,fono=fono,nombre_area=s_area,id_area=i_area,ciudad=ciudad, ip=ip, codigo_tribunal=codigo_tribunal, user_sitci=user_sitci, pass_sitci=pass_sitci)
    session.add(newTribunal) 
    session.commit()
    session.close()
    return {"mensaje":"saludo"}

@routes.route('/updateTribunal/', methods=['POST'])
@jwt_required()
def updateTribunal():
    try:
        current_user_id = get_jwt_identity()
        nombre = request.values['nombre']
        telefono = request.values['telefono']
        ciudad = request.values['ciudad']
        ip = request.values['ip']
        codigo = request.values['codigo']
        nombre_area = request.values['nombre_area']
        id_area = request.values['id_area']
        id_tribunal = request.values['id_tribunal']
        user_sitci = request.values['user_sitci']
        pass_sitci = request.values['pass_sitci']
        print(id_area)
        print(nombre_area)
        
        old_data = session.query(Tribunal).get(id_tribunal)
        old_data.nombre_tribunal = nombre
        old_data.fono = telefono
        old_data.nombre_area = nombre_area.split(",")
        old_data.ciudad = ciudad
        old_data.id_area = id_area.split(",")
        old_data.ip = ip
        old_data.codigo = codigo
        old_data.user_sitci = user_sitci
        old_data.pass_sitci = pass_sitci
        session.merge(old_data)
        session.commit()                                
        return {"mensaje":"saludo"}

    except:
        return ""
    finally:
        session.close()

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
            'nombre':tribunal.nombre_tribunal,
            'fono':tribunal.fono,
            'nombre_area':tribunal.nombre_area,
            'codigo_tribunal':tribunal.codigo_tribunal
        }
        data.append(aux)
    session.close()
    return jsonify({'message': data})

@routes.route('/getTribunalId', methods = ["POST"])
#@jwt_required()
def getTribunalId():
    id_t = request.values['id']
    quer = session.query(Tribunal).get(id_t)
    aux = {
        'id_tribunal':quer.id_tribunal,
        'id_area':quer.id_area,
        'nombre':quer.nombre_tribunal,
        'fono':quer.fono,
        'nombre_area':quer.nombre_area,
        'user_sitci':quer.user_sitci,
        'pass_sitci':quer.pass_sitci
    }
    session.close()
    return aux

@routes.route('/getUserSitci/<id_tribunal>', methods = ["GET"])
#@jwt_required()
def getUserSitci(id_tribunal):
    quer = session.query(Tribunal).get(id_tribunal)
    aux = {
        'user_sitci':quer.user_sitci,
        'pass_sitci':quer.pass_sitci
    }
    session.close()
    return aux
    
    
