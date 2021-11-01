from . import routes
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from Classes.Area import Area

from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()

@routes.route('/getAreas', methods=['GET'])
@jwt_required()
def getAreas():
    try:
        current_user_id = get_jwt_identity()
        query = session.query(Area).all()
        data = []
        for areas in query:
            aux = {
                    'id_area':areas.id_area,
                    'nombre_area':areas.nombre_area,
                    }
            data.append(aux)
        return jsonify({'message': data})
    except:
        return jsonify({'message':'Error mostrando areas'}), 422
    finally:
        session.close()


@routes.route('/createArea/', methods=['POST'])
@jwt_required()
def createArea():
    try:
        current_user_id = get_jwt_identity()
        nombre_area = request.values['nombre_area']
        if nombre_area != '':
            new_area = Area(nombre_area=nombre_area)
            session.add(new_area) 
            session.commit()
            data = {
                'id_area' : new_area.id_area,
                'nombre_area' : new_area.nombre_area
            }
            return jsonify({
                'message': data
                })
        else:
            return jsonify({'message':'No se pudo agregar'}), 422
    except:
        return ''
    finally:
        session.close()

@routes.route('/updateArea/', methods=['POST'])
@jwt_required()
def updateArea():
    try:
        current_user_id = get_jwt_identity()
        id_A = request.values['id_area']
        name_A = request.values['nombre_area']
        name_N = request.values['nombre_area_nuevo']
        AreaM = session.query(Area).get(id_A)
        AreaM.nombre_area = name_N
        session.merge(AreaM)
        session.commit()
        return ""
    except:
        return ''
    finally:
        session.close()

@routes.route('/deleteArea/', methods=['POST'])
@jwt_required()
def deleteArea():
    try:
        current_user_id = get_jwt_identity()
        id_A = request.values['id_area']
        session.query(Area).filter(Area.id_area == id_A).delete()
        session.commit()
        return ""
    except:
        return jsonify({'message':'No se puede eliminar el registro'}), 422
    finally:
        session.close()
 