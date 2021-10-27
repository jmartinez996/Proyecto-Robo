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
from Classes.Tribunal import Tribunal
from hashlib import md5
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
import requests as req
from app import db


@routes.route('/getUsers', methods=['GET'])
@jwt_required()
def getUsers():
    try:
        current_user_id = get_jwt_identity()
        query = User.query.all()
        data = []
        for users in query:
            aux = {
                    'id_usuario':users.id_usuario,
                    'nombre':users.nombre,
                    'apellido':users.apellido,
                    'rut':users.rut,
                    'correo':users.correo
                    }
            data.append(aux)
        return jsonify({'message': data})
    except:
         return jsonify({'message':'No esta logeado'}), 422
    finally:
        db.session.close_all()