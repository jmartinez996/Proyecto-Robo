from . import routes
from flask import Flask, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from Classes.Robots import Robots
from Classes.Tribunal import Tribunal
from Classes.Area import Area
from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()

# @routes.route('/testrobot') 
# def testrobot(): 
#     return {"mensaje":"saludo"}
#     try:
#         return ""

#     except:
#         return ""
@routes.route('/getRobot/<idT>')
@jwt_required()
def getRobot(idT):
    #return {"mensaje": "Saludos"}
    current_user_id = get_jwt_identity()
    query = session.query(Robots, Tribunal, Area).join(Tribunal).filter(Tribunal.id_tribunal==idT).join(Area).all()
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
            'disponibilidad': robots.disponibilidad
        }
        data.append(aux)
    print(data)
    session.close()
    return jsonify({'message': data})

@routes.route('/getRobotArea/<nombre>/<id_tribunal>')
@jwt_required()
def getRobotArea(nombre, id_tribunal):
    print(nombre)
    current_user_id = get_jwt_identity()
    disp = []
    # query = session.query(Robots, Tribunal, Area).join(Area).filter_by(nombre_area = nombre).join(Tribunal).filter_by(id_tribunal=id_tribunal)
    # q = session.query(Robots).filter_by(id_tribunal=int(id_tribunal)).filter_by(disponibilidad = False).first()
    # if(q == None):
    #     disponibilidad = True
    # else: disponibilidad  = False
    rs = session.execute(""" select nombre_robot from robots where disponibilidad = true and id_tribunal = %s """ % (str(id_tribunal)))
    for r in rs:
        disp.append([])
    if (len(disp) == 0):
        disponibilidad = False
    else: disponibilidad = True
    query = session.query(Robots, Tribunal, Area).join(Area).filter_by(nombre_area = nombre).join(Tribunal).filter_by(id_tribunal=int(id_tribunal))
    data = []
    for robots, tribunales, areas in query:
        aux = {
            'id_robot':robots.id_robot,
            'id_area':robots.id_area,
            'nombre_robot':robots.nombre_robot,
            'id_tribunal': robots.id_tribunal,
            'nombre_tribunal': tribunales.nombre,
            'disponibilidad': disponibilidad,
            'ip': tribunales.ip
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
    new_Robot = Robots(id_area=id_area,nombre_robot=nombre, desc_robot = desc, exe_robot = exe, estado_robot = estado, id_tribunal = id_tribunal, disponibilidad = True)
    session.add(new_Robot) 
    session.commit()
    #print("Agregado")
    try:
        return "Se ha creado con exito"
    except:
        return "No se pudo crear el registro"
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
        return "Eliminado con exito"

    except:
       return "No se pudo eliminar el registro"
    finally:
        session.close()

@routes.route('/getRobotbyId/<id_robot>')
@jwt_required()
def getRobotbyId(id_robot):
    print(id_robot)
    current_user_id = get_jwt_identity()
    sql = session.query(Robots).filter(Robots.id_robot == id_robot).all()
    data = []
    for robots in sql:
        aux = {
            'id_robot':robots.id_robot,
            'id_area':robots.id_area,
            'nombre_robot':robots.nombre_robot,
            'id_tribunal': robots.id_tribunal,
            'descripcion_robot':robots.desc_robot
        }
        data.append(aux)
    session.close()
    return jsonify({'message':data})

@routes.route('/updateRobot/', methods=['POST'])
@jwt_required()
def updateRobot():
    try:
        current_user_id = get_jwt_identity()
        id_robot = request.values['id']
        nombre = request.values['nombre']
        descripcion = request.values['descripcion']
        id_area = request.values['id_area']
        
        old_data = session.query(Robots).get(id_robot)
        old_data.nombre_robot = nombre
        old_data.desc_robot = descripcion
        old_data.id_area = id_area
        session.merge(old_data)
        session.commit()                                
        return {"mensaje":"saludo"}

    except:
        return ""
    finally:
        session.close()

@routes.route('/setDisponibilidad/', methods=['POST'])
@jwt_required()
def setDisponibilidad():
    try:
        current_user_id = get_jwt_identity()
        id_robot = request.values['id_robot']
        disponibilidad = request.values['disponibilidad']
        if disponibilidad == 'true':
            disponibilidad = True
        if disponibilidad == 'false':
            disponibilidad = False
        old_data = session.query(Robots).get(id_robot)
        old_data.disponibilidad = disponibilidad
        session.merge(old_data)
        session.commit()
        return {"mensaje":"saludo"}
    except:
        return ''
    finally:
        session.close()
    # print("Robot Ejecutado")
    # return jsonify({'message':'Robot ejecutado'})/
