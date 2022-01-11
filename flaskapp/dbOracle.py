import cx_Oracle
exhorto = []
jueces = []
try:
        connection = cx_Oracle.connect(user="ROBOTIZACION", password="PJUD#211125",dsn="civiprod.bdd.pjud:3455/CIVIPROD")
        print("conectado")
        cur = connection.cursor()
        cur.execute('select * from TAUD_ESCRITOEXHORTO')
        for row in cur.fetchall():
                exhorto.append(row)
        cur.execute('select * from TAUD_JUECESHAB')
        for row in cur.fetchall():
                jueces.append(row)
        cur.close()
        with connection.cursor() as cursor:
            #rev = cursor.callfunc('TV_JOB_JUECESHAB',int,[])
            #rev = cursor.callfunc('TV_JOB_ESCEXHORTO',int,[])
            cursor.close()
        connection.close()
        print("Cursor y Conection cerrada")
except Exception as ex:
        print(ex)
print(exhorto)
print("----------------------------------")
print(jueces)