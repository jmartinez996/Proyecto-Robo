from flask import Blueprint
routes = Blueprint('routes', __name__)


from .area import *
from .Robots import *
