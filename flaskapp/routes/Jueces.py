from . import routes
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from Classes.Area import Area

from database import Base, SessionLocal, engine

Base.metadata.create_all(engine)

session = SessionLocal()