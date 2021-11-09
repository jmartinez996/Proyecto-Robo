from . import routes
from flask import Flask, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from Classes.Robots import Robots
from Classes.Tribunal import Tribunal
from Classes.Area import Area
from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/testrobot') 
def testrobot(): 
    return {"mensaje":"saludo"}
    try:
        return ""

    except:
        return ""
@routes.route('/getRobot')
#@jwt_required()
def getRobot():
    #return {"mensaje": "Saludos"}
    query = session.query(Robots, Tribunal, Area).join(Tribunal).join(Area).all()
    print(query)
    data = []
    for robots, tribunales, areas in query:
        aux = {
            'id_robot':robots.id_robot,
            'id_area':robots.id_area,
            'nombre_robot':robots.nombre_robot,
            'desc_robot':robots.desc_robot,
            'exe_robot':robots.exe_robot,
            'estado_robot':robots.estado_robot,
            'id_tribunal': robots.id_tribunal,
            'nombre_tribunal': tribunales.nombre,
            'nombre_area': areas.nombre_area,
        }
        data.append(aux)
    session.close()
    return jsonify({'message': data})

@routes.route('/createRobot/', methods=['POST'])
@jwt_required()
def createRobot():
    current_user_id = get_jwt_identity()
    nombre = request.values['nombre']
    #print(nombre)
    desc = request.values['descripcion']
    exe = request.values['ruta']
    # tribunal = request.values['nombre_tribunal']
    # area = request.values['nombre_area']
    id_area = request.values['id_area']
    id_tribunal = request.values['id_tribunal']
    estado = 0
    new_Robot = Robots(id_area=id_area,nombre_robot=nombre, desc_robot = desc, exe_robot = exe, estado_robot = estado, id_tribunal = id_tribunal,)#nombre_tribunal = tribunal,nombre_area = area)
    session.add(new_Robot) 
    session.commit()
    #print("Agregado")
    try:
        return ""
    except:
        return ""
    finally:
        session.close()
    
@routes.route('/deleteRobot/', methods=['POST'])
@jwt_required()
def deleteRobot():
    current_user_id = get_jwt_identity()
    id_R = request.values['id_robot']
    session.query(Robots).filter(Robots.id_robot == id_R).delete()
    session.commit()
    try:
        return ""

    except:
       return ""
    finally:
        session.close()


