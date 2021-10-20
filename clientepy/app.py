from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/') 
def index():
    print('recibido desde el cliente')
    os.startfile(r"prueba.bat")  
    return 'robot ejecutado'

if __name__ == '__main__': 
    app.run(debug=True, port=5001)  