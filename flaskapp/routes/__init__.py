from flask import Blueprint
routes = Blueprint('routes', __name__)


from .area import *
from .Tribunal import *
from .Robots import *
from .crudrobot import *
