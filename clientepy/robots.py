import time
import os
from multiprocessing import Process, Queue

def background_task(n):
    """ Function that returns len(n) and simulates a delay """

    delay = 2

    print("Task running")
    print(f"Simulating a {delay} second delay")

    time.sleep(delay)

    print(len(n))
    print("Task complete")

    return len(n)


def EjecutaIngresoExhorto(data, queue):
    print(data)
    script = 'start "" /min "C:/Users/'+data['windows_user']+'/AppData/Local/Programs/UiPath/Studio/UiRobot.exe" execute --file "D:/'+data['windows_user']+'/Documents/UiPath/exhortos sin acreditacion/main.xaml"' + " --input "+'"'+"{'juez_firma':'"+data['juez']+"', 'id_tribunal':'"+data['id_tribunal']+"', 'id_robot':'"+data['id_robot']+"', 'contrasena':'"+data['pass_sitci']+"', 'correo':'"+data['correo']+"', 'usuario':'"+data['user_sitci']+"'}"+'"'                                                                   
    queue.put(os.system(script))
    return 'Robot Ingreso de exhorto ejecutado'