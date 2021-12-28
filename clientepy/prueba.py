# import threading, queue
# import time

# q = queue.Queue()

# def worker():
#     while True:
#         print('hola')
#         item = q.get()
#         print(f'Working on {item}')
#         print(f'Finished {item}')
#         q.task_done()

# # turn-on the worker thread
# threading.Thread(target=worker, daemon=True).start()

# def func(i):
#     print(i)
#     time.sleep(1)

# # send thirty task requests to the worker
# for item in range(5):
#     q.put(func(item))


# print('All task requests sent\n', end='')

# # block until all tasks are done
# q.join()
# print('All work completed')

import wmi
import pythoncom


def CheckUiPath():
    pythoncom.CoInitialize()
    f = wmi.WMI()
    for process in f.Win32_Process():
        if(process.name == 'UiRobot.exe'):
            print('Si esta corriendo Uipath')
            return False 

    return True


while CheckUiPath():
    print('algo paso aca')
