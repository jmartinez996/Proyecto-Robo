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


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ywtg.9819@localhost/robot'
db = SQLAlchemy(app)

@routes.route('/createTribunal/', methods=['POST'])
@jwt_required()
def createArea():
    try:
        return ""

    except:
        return ""

@routes.route('/updateTribunal/', methods=['POST'])
@jwt_required()
def updateArea():
    try:
        return ""

    except:
        return ""

@routes.route('/deleteTribunal/', methods=['POST'])
@jwt_required()
def deleteArea():
    
    try:
        return ""

    except:
        return ""
 

@routes.route('/upAreas') 
def upAreas(): 
    return {"mensaje":"saludo"}