from flask import render_template
from . import routes
from operator import countOf
import re
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from sqlalchemy.orm import query
from sqlalchemy.sql import text
from werkzeug.datastructures import ResponseCacheControl
from Classes.Usuarios import User
from Classes.Area import Area
from hashlib import md5
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
import requests as req


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

@routes.route('/getAreas', methods=['GET'])
@jwt_required()
def getAreas():
    try:
        current_user_id = get_jwt_identity()
        query = Area.query.all()
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

@routes.route('/createArea/', methods=['POST'])
@jwt_required()
def createArea():
    try:
        current_user_id = get_jwt_identity()
        nombre_area = request.values['nombre_area']
        if nombre_area != '':
            new_area = Area(nombre_area=nombre_area)
            db.session.add(new_area) 
            db.session.commit()
            print(new_area)
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

@routes.route('/updateArea/', methods=['POST'])
@jwt_required()
def updateArea():
    try:
        current_user_id = get_jwt_identity()
        id_A = request.values['id_area']
        name_A = request.values['nombre_area']
        name_N = request.values['nombre_area_nuevo']
        print(name_N)
        print("<",id_A,"--",name_A,">")
        AreaM = Area.query.get(id_A)
        print("a")
        AreaM.nombre_area = name_N
        print("b")
        db.session.merge(AreaM)
        print("c")
        db.session.commit()
        return ""
    except:
        return ''

@routes.route('/deleteArea/', methods=['POST'])
@jwt_required()
def deleteArea():
    
    try:
        id_A = request.values['id_area']
        name_A = request.values['nombre_area']
        print("<",id_A,"--",name_A,">")
        print("a")
        current_user_id = get_jwt_identity()
        print("b")
        db.session.query(Area).filter(Area.id_area == id_A).delete()
        print("c")
        db.session.commit()
        #con = Area.query.filter_by(id_area = id_A).first()
        #print(con.id_area)
        #db.session.delete(con.id_area)
        #print("c")
        #db.session.commit()
        print("eliminado")
        return ""
    except:
        return jsonify({'message':'No se puede eliminar el registro'}), 422
 

@routes.route('/upAreas') 
def upAreas(): 
    return {"mensaje":"saludo"}