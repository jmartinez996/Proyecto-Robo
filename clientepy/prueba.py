import os

# os.system('start "" /min "C:/Users/sala2_jltpucon/AppData/Local/UiPath/app-20.4.3/UiRobot.exe" -f "D:/sala2_jltpucon/Documents/UiPath/Tarea de prueba/Main.xaml"')
#os.system('start "" /min "C:/Users/sala2_jltpucon/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" -f "D:/sala2_jltpucon/Documents/UiPath/Tarea de prueba/Main.xaml" --input {"correo":"asdasds"}')

os.system('start "" /min "C:/Users/sala2_jltpucon/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/sala2_jltpucon/Documents/UiPath/Tarea de prueba/Main.xaml "' + " --input {'correo':'hola'}")