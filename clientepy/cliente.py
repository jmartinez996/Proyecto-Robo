from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests as req
from getpass import getuser
from datetime import date, timedelta

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

@app.route('/')
def index():
    return 'It Works!'

@app.route('/mensaje', methods=['GET'])
def mensaje():
    return 'It Works!'

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
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'archivo':'"+file+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"'}"+'"'                                                               
    os.system(script)                             
    
    #os.system('start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/Main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'ruta':'"+path+"'}"+'"')      
    print(script)
    return 'robot ejecutado'

@app.route('/ExeGestSii/', methods=['POST']) 
def ExeGestSii():

    windows_user = getuser()

    archivo = request.files['file1']
    correo = request.values['correo']
    user_sii = request.values['user_sii']
    pass_sii = request.values['pass_sii']
    id_robot = request.values['id_robot']
    id_tribunal = request.values['id_tribunal']

    # fecha_act = date.today().replace(day=1)
    # mes_ant = fecha_act - timedelta(days = 1)
    # file = 'EstadoMensual'+str(mes_ant.strftime("%b"))+'.xls'
    file = 'archivo.xls'
    # path = os.path.abspath(file)
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file))
    print('recibido desde el cliente')                                                                           #VOOOOOOOY AQUIIIIIIIII
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Pago de facturas/main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_sii+"', 'user_wind':'"+windows_user+"', 'pass_mixtos':'"+pass_sii+"', 'archivo':'"+file+"', 'id_tribunal':'"+id_tribunal+"', 'id_robot':'"+id_robot+"'}"+'"'                                                               
    # "C:\Users\sala2_jltpucon\AppData\Local\Programs\UiPath\Studio\UiRobot.exe"
    os.system(script)                             
    
    #os.system('start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/Main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'ruta':'"+path+"'}"+'"')      
    print(script)
    return 'robot ejecutado'



if __name__ == '__main__': 
    app.run(debug=True, host = '0.0.0.0', port=5001)  