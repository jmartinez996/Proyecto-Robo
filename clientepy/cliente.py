from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests as req
from getpass import getuser
from datetime import date, timedelta

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './'
CORS(app)

@app.route('/', methods=['POST']) 
def index():
    windows_user = getuser()
    archivo = request.files['file1']
    correo = request.values['correo']
    user_mixtos = request.values['user_mixtos']
    pass_mixtos = request.values['pass_mixtos']
    user_familia = request.values['user_familia']
    pass_familia = request.values['pass_familia']
    user_siagj = request.values['user_siagj']
    pass_siagj = request.values['pass_siagj']

    fecha_act = date.today().replace(day=1)
    mes_ant = fecha_act - timedelta(days = 1)
    file = 'EstadoMensual'+str(mes_ant.strftime("%b"))+'.xls'
    path = os.path.abspath(file)
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],file))
    print('recibido desde el cliente')
    script = 'start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/Main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'archivo':'"+file+"'}"+'"'                                                               
    os.system(script)                             
    
    #os.system('start "" /min "C:/Users/'+windows_user+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+windows_user+'/Documents/UiPath/Informe Mensual/Main.xaml"' + " --input "+'"'+"{'correo':'"+correo+"', 'user_mixtos':'"+user_mixtos+"', 'pass_mixtos':'"+pass_mixtos+"', 'user_familia':'"+user_familia+"', 'pass_familia':'"+pass_familia+"', 'user_siagj':'"+user_siagj+"', 'pass_siagj':'"+pass_siagj+"', 'ruta':'"+path+"'}"+'"')      
    print(script)
    return 'robot ejecutado'

if __name__ == '__main__': 
    app.run(debug=True, port=5001)  