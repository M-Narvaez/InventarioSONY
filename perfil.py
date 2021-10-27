from db import get_db
import sqlite3



def get_Perfiles():

     db = get_db()

     db.row_factory = sqlite3.Row
     filas = db.execute("SELECT * FROM Perfiles").fetchall()
     db.close()

     perfiles = []
     for item in filas:
          perfiles.append({k: item[k] for k in item.keys()})
     
     return perfiles