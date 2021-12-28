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
q = queue.Queue()


def worker(arreglo):
    while len(arr) > 0:
        time.sleep(1)
        print(arreglo)
        sys.stdout.flush()




def cierraIExplore():
    pythoncom.CoInitialize()
    f = wmi.WMI()
    for process in f.Win32_Process():
        if(process.name == 'iexplore.exe'):
            process.Terminate()
            print('Internet Explorer Cerrado') 

def CheckUiPath():
    pythoncom.CoInitialize()
    f = wmi.WMI()
    for process in f.Win32_Process():
        if(process.name == 'UiRobot.exe'):
            print('Si esta corriendo Uipath')
            return False 
    return True


@app.route('/')
def index():
    return 'It Works!'

@app.route('/mensaje', methods=['GET'])
def mensaje():
    return 'It Works!'


##################### RESUMEN MENSUAL #################

# @app.route('/ExeResMens/', methods=['POST']) 
# def ExeResMens():

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

# def EjecutaGestionSii(data, queue):
#     cierraIExplore()  
#     script = 'start "" /min "C:/Users/'+data['windows_user']+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+data['windows_user']+'/Documents/UiPath/Pago de facturas/main.xaml"' + " --input "+'"'+"{'correo':'"+data['correo']+"', 'user_mixtos':'"+data['user_sii']+"', 'user_wind':'"+data['windows_user']+"', 'pass_mixtos':'"+data['pass_sii']+"', 'archivo':'"+data['file']+"', 'id_tribunal':'"+data['id_tribunal']+"', 'id_robot':'"+data['id_robot']+"'}"+'"'
#     queue.put(os.system(script))
#     return 'Robot Ingreso de exhorto ejecutado'

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
    data = {
        'windows_user' : windows_user,
        'file' : file,
        'correo' : correo,
        'user_sii' : user_sii,
        'pass_sii' : pass_sii,
        'id_robot' : id_robot,
        'id_tribunal' : id_tribunal
    }

    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file))
    
    
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Pago de facturas/main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_sii+"', 'user_wind':'"+windows_user+"', 'pass_mixtos':'"+pass_sii+"', 'archivo':'"+file+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"'}"+'"'
    flag = True
    while flag:
        if CheckUiPath() == True:
            cierraIExplore()
            os.system(script)
            flag = False
    
    return 'robot ejecutado'

################### INGRESO DE EXHORTO #################

def EjecutaIngresoExhorto(data):
    flag = True
    cierraIExplore() 
    script = 'start "" /min "C:/Users/'+data['windows_user']+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+data['windows_user']+'/Documents/UiPath/exhortos sin acreditacion/main.xaml"' + " --input "+'"'+"{'juez_firma':'"+data['juez']+"', 'id_tribunal':'"+data['id_tribunal']+"', 'id_robot':'"+data['id_robot']+"', 'contrasena':'"+data['pass_sitci']+"', 'correo':'"+data['correo']+"', 'usuario':'"+data['user_sitci']+"'}"+'"'                                                                   
    os.system(script)
    time.sleep(5)
    while flag:
        ui = CheckUiPath()
        if (ui == True):
            print('se ejecuta uipath')
            flag = False
    
    
    return 'Robot Ingreso de exhorto ejecutado'



@app.route('/ExeIngresoExhorto/', methods=['POST']) 
def ExeIngresoExhorto():
    windows_user = getuser()
    id_robot = request.values['id_robot']
    id_tribunal = request.values['id_tribunal']
    juez = request.values['juez']
    user_sitci = request.values['user_sitci']
    pass_sitci = request.values['pass_sitci']
    correo = request.values['correo']

    data = {
        'windows_user': windows_user,
        'id_robot':id_robot,
        'id_tribunal':id_tribunal,
        'juez':juez,
        'user_sitci':user_sitci,
        'pass_sitci':pass_sitci,
        'correo':correo
    }
    
    script = 'start /w "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/exhortos sin acreditacion/main.xaml"' + " --input "+'"'+"{'juez_firma':'"+juez+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"', 'contrasena':'"+pass_sitci+"', 'correo':'"+correo+"', 'usuario':'"+user_sitci+"'}"+'"'                                                               
    flag = True
    # arr.append('1')
    while flag:
        if CheckUiPath() == True:
            
            cierraIExplore()
            os.system(script)
            flag = False
    
    # print('Robot Ingreso de exhortos ejecutado.')
    # print(q.empty())
    # globals()['q'].put(cierraIExplore())
    
    
    # q.put(cierraIExplore())
    # q.put(os.system(script))
    
    # globals()['q'].put(EjecutaIngresoExhorto(data))
    # globals()['q'].join()  
    # print(q.get())
    

    
    return 'robot ejecutado' 



if __name__ == '__main__':
    arr = []    
    threading.Thread(target=worker, args=(arr)).start()
    
    app.run(debug=True, host = '0.0.0.0', port=5001)

    
    


