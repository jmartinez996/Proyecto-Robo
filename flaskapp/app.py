from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt, set_access_cookies, unset_access_cookies
from sqlalchemy.orm import query, scoped_session
from Classes.Usuarios import User
from werkzeug.security import check_password_hash as checkph
from werkzeug.security import generate_password_hash as genph
from routes import *
from datetime import timedelta
from database import Base, SessionLocal, engine
from flask_mail import Mail, Message
# from flask_socketio import SocketIO, emit

app = Flask(__name__)

app.register_blueprint(routes)

app.config['JWT_SECRET_KEY'] = 'ywtg.9819'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
#app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config['UPLOAD_FOLDER'] = './Archivos'

app.config['MAIL_SERVER']='smtp.mail.pjud'
app.config['MAIL_PORT'] = 25
app.config['MAIL_USERNAME'] = 'sgc_pucon@pjud.cl'
app.config['MAIL_PASSWORD'] = 'letras2021'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = False
# db = SQLAlchemy(app)

Base.metadata.create_all(engine)
session = SessionLocal()

jwt = JWTManager(app)
mail = Mail(app)
# socketio = SocketIO(app)
# socket_io = SocketIO(app, cors_allowed_origins="*", async_mode='threading')
CORS(app)


@app.route('/') 
def index(): 
    msg = Message('Hello', sender = 'sgc_pucon@pjud.cl', recipients = ['agmardones@pjud.cl'])
    msg.body = "Hello Flask message sent from Flask-Mail"
    mail.send(msg)
    return {"mensaje":"saludo"}

@app.route('/mensaje/', methods=['GET', 'POST'])
def mensaje():
    data = request.values['i']
    print(data)
    return "recibido"

@app.route('/login', methods=['POST'])
def login():
    rut = request.values['rut']
    contrasena = request.values['contrasena']
    try:
        usuario = session.query(User).filter_by(rut=rut).first()
        
        if usuario.rut == rut and checkph(usuario.contrasena, contrasena):
            access_token = create_access_token(identity=usuario.id_usuario)
            return jsonify(message="Usuario correcto.", token=access_token, id_usuario=usuario.id_usuario), 200
    except:
        return jsonify(message="Usuario o contrasena son incorrectos."), 400
    finally:
        session.close()
    
@app.route('/userState', methods=['GET'])
@jwt_required()
def userState():
    try:
        current_user_id = get_jwt_identity()
        user = session.query(User).filter_by(id_usuario=current_user_id).first()
        return jsonify({"id_usuario": user.id_usuario, "nombre": user.nombre}), 200
    except:
        return jsonify({'message':'No esta logeado'}), 422
    finally:
        session.close()

@app.route('/agregauser/', methods=['POST'])
@jwt_required()
def agregauser():
    try:
        current_user_id = get_jwt_identity()
        nombre = request.values['nombre']
        apellido = request.values['apellido']
        rut = request.values['rut']
        correo = request.values['correo']
        contrasena = request.values['contrasena']
        repcontrasena = request.values['repcontrasena']
        tribunal = request.values['tribunal']
        print(tribunal)
        if contrasena != repcontrasena:
            return jsonify({'message':'Contrasenas no coinciden.'}),422
        else:
            contrasena = genph(contrasena)
            new_user = User(nombre=nombre, apellido=apellido, rut=rut, correo=correo, contrasena=contrasena, tipo_usuario=2, id_area=1, id_tribunal=tribunal) 
            session.add(new_user) 
            session.commit()
            return jsonify({'message':'Usuario Registrado con Exito'})
    except:
        return jsonify({'message':'No se pudo agregar el Usuario '+ nombre}), 422
    finally:
        session.close()

# @app.route('/sendEmail/') 
# def index(): 
#     msg = Message('Hello', sender = 'sgc_pucon@pjud.cl', recipients = ['agmardones@pjud.cl'])
#     msg.body = "Hello Flask message sent from Flask-Mail"
#     mail.send(msg)
#     return {"mensaje":"saludo"}



# @socket_io.on('connect')
# def test_connect():
#     print('conectado')

# @socket_io.on('disconnect')
# def test_disconnect():
#     print('desconectado')


if __name__ == '__main__': 
    # socketio.run(app, host='0.0.0.0', debug=False)
    # socket_io.run(app, debug=True)
    app.run(debug=True)     
