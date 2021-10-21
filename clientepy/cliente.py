from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests as req
from getpass import getuser

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
    archivo.save(os.path.join(app.config['UPLOAD_FOLDER'],'resumen.xls'))
    print('recibido desde el cliente')
    #os.startfile(r"prueba.bat")  
    os.system('start "" /min "C:/Users/'+windows_user+'/AppData/Local/UiPath/app-20.4.3/UiRobot.exe" -f "D:/'+windows_user+'/Documents/UiPath/Tarea de prueba/Main.xaml" -i {"correo":'+correo+'}')

    return 'robot ejecutado'

if __name__ == '__main__': 
    app.run(debug=True, port=5001)  