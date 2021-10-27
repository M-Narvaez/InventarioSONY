
producto=[
    {'ID': '0000', 'Nombre': 'Sony X00', 'Descripcion': 'Smartphone...', 'Proveedor': 'SONY GAMIN', 'CantidadBodega': '150', 'CantidadMinima': '50'},
    {'ID': '1100', 'Nombre': 'Sony X', 'Descripcion': 'Smartphone...', 'Proveedor': 'SONY BASIC', 'CantidadBodega': '300', 'CantidadMinima': '50'},
    {'ID': '1200', 'Nombre': 'Sony XZ', 'Descripcion': 'Smartphone...', 'Proveedor': 'SONY PRO', 'CantidadBodega': '250', 'CantidadMinima': '50'}
    
]

"""
from db import get_db
import sqlite3

db = get_db()

db.row_factory = sqlite3.Row

filas = db.execute("SELECT * FROM Producto").fetchall()
db.close()

print(filas)

producto = []
for item in filas:
    producto.append({k: item[k] for k in item.keys()})

    print(producto)
"""

