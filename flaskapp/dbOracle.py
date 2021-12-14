# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URI = 'oracle://ROBOTIZACION:PJUD@211125@civiprod.bdd.pjud:1715/CIVIPROD'
# # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:ywtg.9819@localhost:5434/robot'

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URI
# )

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# Base.metadata.create_all(engine)

# session = SessionLocal()

# from sqlalchemy.engine import create_engine
# import pandas as pd

# DIALECT = 'oracle'
# SQL_DRIVER = 'cx_oracle'
# USERNAME = 'ROBOTIZACION' #enter your username
# PASSWORD = 'PJUD#211125' #enter your password
# HOST = 'civiprod.bdd.pjud' #enter the oracle db host url
# PORT = 1715 # enter the oracle port number
# SERVICE = 'CIVIPROD' # enter the oracle db service name
# ENGINE_PATH_WIN_AUTH = DIALECT + '+' + SQL_DRIVER + '://' + USERNAME + ':' + PASSWORD +'@' + HOST + ':' + str(PORT) + '/?service_name=' + SERVICE

# import cx_Oracle

# try:
#     con = cx_Oracle.connect(
#         user='ROBOTIZACION',
#         password='PJUD#211125',
#         dsn='civiprod.bdd.pjud:1715/CIVIPROD',
#         encoding='UTF-8'
#     )
#     print(con.version)
# except Exception as ex:
#     print(ex)





import cx_Oracle #importar libreria
dsn = cx_Oracle.makedsn(host='civiprod.bdd.pjud:1715', port=1715, sid='CIVIPROD') #configurar dns
conn = cx_Oracle.connect(user='ROBOTIZACION', password='PJUD#211125', dsn=dsn)#usario que se conectara a la base de datos
c = conn.cursor()
# c.execute('select id,text from test where xml is not null and ROWNUM<=5')# script SQL que se va a ejecutar
# for row in c:
#     print('id -> '+str(row[0])+ '-'+ ' text -> '+row[1])#imprime id y text
conn.close()#cierra la conexion