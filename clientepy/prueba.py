import os
from datetime import date, timedelta
from time import time

# os.system('start "" /min "C:/Users/sala2_jltpucon/AppData/Local/UiPath/app-20.4.3/UiRobot.exe" -f "D:/sala2_jltpucon/Documents/UiPath/Tarea de prueba/Main.xaml"')
#os.system('start "" /min "C:/Users/sala2_jltpucon/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" -f "D:/sala2_jltpucon/Documents/UiPath/Tarea de prueba/Main.xaml" --input {"correo":"asdasds"}')

# os.system('start "" /min "C:/Users/sala2_jltpucon/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/sala2_jltpucon/Documents/UiPath/Tarea de prueba/Main.xaml "' + " --input {'correo':'hola'}")

file = 'archivo.xls'
bas_path = os.path.abspath(file)
print(bas_path)


#print (date.strftime("%b"))


#fecha_act = date.today().replace(day=1)
#mes_ant = fecha_act - timedelta(days = 1)

#print(mes_ant.strftime("%b"))