from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests as req
from getpass import getuser
from datetime import date, timedelta
import wmi
import pythoncom
# from robots import EjecutaIngresoExhorto
import threading, queue
import time
import random as ra
import sys

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

def cierraIExplore():
    pythoncom.CoInitialize()
    f = wmi.WMI()
    for process in f.Win32_Process():
        if(process.name == 'iexplore.exe'):
            process.Terminate()
            print('Internet Explorer Cerrado') 

@app.route('/')
def index():
    return 'It Works!'

@app.route('/mensaje', methods=['GET'])
def mensaje():
    return 'It Works!'


##################### RESUMEN MENSUAL #################

@app.route('/ExeResMens/', methods=['POST']) 
def ExeResMens():

    windows_user = getuser()

    archivo = request.files['file1']
    correo = request.values['correo']
    user_mixtos = request.values['user_mixtos']
    pass_mixtos = request.values['pass_mixtos']
    user_familia = request.values['user_familia']
    pass_familia = request.values['pass_familia']
    user_siagj = request.values['user_siagj']
    pass_siagj = request.values['pass_siagj']
    id_robot = request.values['id_robot']
    id_tribunal = request.values['id_tribunal']

    fecha_act = date.today().replace(day=1)
    mes_ant = fecha_act - timedelta(days = 1)
    file = 'EstadoMensual'+str(mes_ant.strftime("%b"))+'.xls'
    path = os.path.abspath(file)
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file))
    print('recibido desde el cliente')


    cierraIExplore()  
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'archivo':'"+file+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"'}"+'"'                                                               
    print(os.system(script))                             

    #os.system('start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/Main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'ruta':'"+path+"'}"+'"')      
    print(script)
    return 'robot ejecutado'

##################### GESTION DE SII ##################

@app.route('/ExeGestSii/', methods=['POST']) 
def ExeGestSii():

    windows_user = getuser()
    archivo = request.files['file1']
    correo = request.values['correo']
    user_sii = request.values['user_sii']
    pass_sii = request.values['pass_sii']
    id_robot = request.values['id_robot']
    id_tribunal = request.values['id_tribunal']
    file = 'archivo.xls'
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file))
    
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Pago de facturas/main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_sii+"', 'user_wind':'"+windows_user+"', 'pass_mixtos':'"+pass_sii+"', 'archivo':'"+file+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"'}"+'"'
    os.system(script)
    
    return 'robot ejecutado'

################### INGRESO DE EXHORTO #################

@app.route('/ExeIngresoExhorto/', methods=['POST']) 
def ExeIngresoExhorto():
    windows_user = getuser()
    id_robot = request.values['id_robot']
    id_tribunal = request.values['id_tribunal']
    juez = request.values['juez']
    user_sitci = request.values['user_sitci']
    pass_sitci = request.values['pass_sitci']
    correo = request.values['correo']
    id_usuario = request.values['id_usuario']
    
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/exhortos sin acreditacion/main.xaml"' + " --input "+'"'+"{'juez_firma':'"+juez+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"', 'contrasena':'"+pass_sitci+"', 'correo':'"+correo+"', 'id_usuario':'"+id_usuario+"', 'usuario':'"+user_sitci+"'}"+'"'                                                               
    os.system(script)
    
    return 'robot ejecutado' 



if __name__ == '__main__':
    app.run(debug=True, host = '0.0.0.0', port=5001)

    
    


