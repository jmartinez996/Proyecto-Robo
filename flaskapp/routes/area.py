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
from werkzeug.datastructures import ResponseCacheControl
from Classes.Usuarios import User
from Classes.Area import Area
from hashlib import md5
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
import requests as req

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

@routes.route('/upAreas') 
def upAreas(): 
    return {"mensaje":"saludo"}