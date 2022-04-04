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
# from flask_apscheduler import APScheduler
from Classes.Robots import Robots
from Classes.Jueces import Jueces
from Classes.Tribunal import Tribunal
import requests as req
import cx_Oracle

  


app = Flask(__name__)

app.register_blueprint(routes)

app.config['JWT_SECRET_KEY'] = 'ywtg.9819'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
#app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config['UPLOAD_FOLDER'] = './Archivos'

app.config['MAIL_SERVER']='smtp.mail.pjud'
app.config['MAIL_PORT'] = 25
app.config['MAIL_USERNAME'] = 'rpa_araucania@pjud.cl'
app.config['MAIL_PASSWORD'] = 'araucania2022'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = False
# db = SQLAlchemy(app)

Base.metadata.create_all(engine)
session = SessionLocal()

jwt = JWTManager(app)
mail = Mail(app)

# scheduler = APScheduler()

CORS(app)


@app.route('/') 
def index(): 
    # msg = Message('Hello', sender = 'rpa_araucania@pjud.cl', recipients = ['agmardones@pjud.cl'])
    # msg.body = "Hello Flask message sent from Flask-Mail"
    # mail.send(msg)
    return {"mensaje":"Funciona"}

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
            return jsonify(message="Usuario correcto.", token=access_token, id_usuario=usuario.id_usuario,role=usuario.tipo_usuario,name = usuario.nombre, id_tribunal = usuario.id_tribunal), 200
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
        return jsonify({"id_usuario": user.id_usuario, "nombre": user.nombre, 'id_tribunal':user.id_tribunal}), 200
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
        tipo_usuario = request.values['tipo_usuario']
        print(tribunal)
        if contrasena != repcontrasena:
            return jsonify({'message':'Contrasenas no coinciden.'}),422
        else:
            contrasena = genph(contrasena)
            new_user = User(nombre=nombre, apellido=apellido, rut=rut, correo=correo, contrasena=contrasena, tipo_usuario=tipo_usuario, id_area=1, id_tribunal=tribunal) 
            session.add(new_user) 
            session.commit()
            return jsonify({'message':'Usuario Registrado con Exito'})
    except:
        return jsonify({'message':'No se pudo agregar el Usuario '+ nombre}), 422
    finally:
        session.close()

# @app.route('/IngresoDeExhorto')
# def IngresoDeExhorto():
#     try:
#         print('ejecutando')
#         query = session.query(Robots, Tribunal, Jueces).join(Tribunal).join(Jueces).all()
#         # print(query)
#         data = []
#         for robots, tribunal, jueces in query:
#             # print(robots)
#             aux = {
#                 'id_robot':robots.id_robot,
#                 'id_tribunal':tribunal.id_tribunal,
#                 'ip':tribunal.ip,
#                 'juez':jueces.apellido_juez + ', ' + jueces.nombre_juez
#             }
#             # print(aux)
#             data.append(aux)
        
#         if (len(data) != 0):
#             for i in data:
#                 print (i)
#                 resp = req.post('http://'+i['ip']+':5001/ExeIngresoExhorto/', data=i)

        
#         return 'ejecutado'
#     except:
#         return ''
#     finally:
#         session.close()
#         return 'Conexion finalizada'

@app.route('/checkConnect', methods=['POST'])
def checkConnect():
    try:
        idTribunal = request.values['idTribunal']
        
        ip = session.query(Tribunal.ip).filter_by(id_tribunal=idTribunal).first()
        # print(ip[0])
        resp = req.get('http://'+ip[0]+':5001/checkConnection')
        # print(resp._content)
        if(resp._content == b'funciona'):
            print('funciona la comprobacion')
            return 'True'
        else:
            return 'False'
    except:
        return 'False'
    finally:
        session.close()

@app.route('/getJueces/<idT>', methods=['GET'])
@jwt_required()
def getJueces(idT):
    try:
        jueces = []
        codigo_tribunal = session.query(Tribunal.codigo_tribunal).filter_by(id_tribunal=idT).first()
        connection = cx_Oracle.connect(user="ROBOTIZACION", password="PJUD#211125",dsn="civiprod.bdd.pjud:3455/CIVIPROD")
        cur = connection.cursor()
        cur.execute('select * from TAUD_JUECESHAB where COD_TRIBUNAL =' + str(codigo_tribunal[0]))
        for row in cur.fetchall():
            nombres = row[0].split(" ")
            aux = {
                'primer_nombre':nombres[0].capitalize(),
                'segundo_nombre':nombres[1].capitalize(),
                'apellido_paterno':row[1].capitalize(),
                'apellido_materno':row[2].capitalize(),
                'cargo':row[3],
                'codigo_tribunal':row[5],
                'nombre_tribunal':row[6]
            }
            jueces.append(aux)

        cur.close()
        connection.close()

        return jsonify({'message':jueces})

    except Exception as ex:
        print(ex)
        return 'hubo un problema conectando a civiprod'

@app.route('/getExhortos/<idT>', methods=['GET'])
@jwt_required()
def getExhortos(idT):
    try:
        exhortos = []
        codigo_tribunal = session.query(Tribunal.codigo_tribunal).filter_by(id_tribunal=idT).first()
        connection = cx_Oracle.connect(user="ROBOTIZACION", password="PJUD#211125",dsn="civiprod.bdd.pjud:3455/CIVIPROD")
        cur = connection.cursor()
        cur.execute('select * from TAUD_ESCRITOEXHORTO where COD_TRIBUNAL =' + str(codigo_tribunal[0]))
        for row in cur.fetchall():
            aux = {
                'rit':row[0],
                'relacionado':row[3],
                'fecha':str(row[2].day)+'/'+str(row[2].month)+'/'+str(row[2].year)
            }
            exhortos.append(aux)
        print(exhortos)
        cur.close()
        connection.close()

        return jsonify({'message':exhortos})

    except Exception as ex:
        print(ex)
        return 'hubo un problema conectando a civiprod'

@app.route('/updateDB', methods=['GET'])
@jwt_required()
def updateDB():
    try:
        connection = cx_Oracle.connect(user="ROBOTIZACION", password="PJUD#211125",dsn="civiprod.bdd.pjud:3455/CIVIPROD")
        cur = connection.cursor()
        rev = cur.callfunc('TV_JOB_JUECESHAB',int,[])
        rev = cur.callfunc('TV_JOB_ESCEXHORTO',int,[])
        cur.close()
        connection.close()
        print('Base de datos actualizada')
        return jsonify({'message':'Base de datos actualizada.'})
    except Exception as ex:
        print(ex)
        return jsonify({'message':'Hubo un problema actualizando la base de datos.'})

# This route generates HTML of documentation


# @app.route('/Ejecuta', methods=['GET','POST'])
# def Ejecuta():
#     IngresoDeExhorto()
#     return 'ejecutado aca'

if __name__ == '__main__': 
    # scheduler.add_job(id='Scheduled task', func = IngresoDeExhorto, trigger = 'cron', hour = 1, minute = 5)

    # scheduler.start()
    app.run(host='0.0.0.0',debug=True)     

