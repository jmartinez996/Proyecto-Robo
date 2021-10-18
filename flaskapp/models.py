from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin):
    def __init__(self, id_usuario, nombre, correo, contrasena,apellido, rut, id_area, is_admin=False):
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.apellido = apellido
        self.rut = rut
        self.correo = correo
        self.contrasena = generate_password_hash(contrasena)
        self.id_area = id_area
        self.is_admin = is_admin

    def set_password(self, contrasena):
        self.password = generate_password_hash(contrasena)

    def check_password(self, contrasena):
        return check_password_hash(self.contrasena, contrasena)
        
    def __repr__(self):
        return '<User {}>'.format(self.rut)