import sqlite3
import functools
from flask import Flask, render_template, blueprints, request, jsonify, url_for,  redirect, session, flash
from werkzeug.security import check_password_hash, generate_password_hash
from db import get_db

main = blueprints.Blueprint('main', __name__)


def login_required(vista):
    @functools.wraps(vista)
    def vista_envuelta(**kwargs):
        if 'correo' not in session:
            return redirect(url_for('main.index'))
        return vista(**kwargs)

    return vista_envuelta


def restriccion_trabajador(vista):
    @functools.wraps(vista)
    def vista_envuelta(**kwargs):
        if (session['perfil'] == 1):
            return redirect(url_for('main.dashEmpleado'))
        return vista(**kwargs)

    return vista_envuelta


def restriccion_administrador(vista):
    @functools.wraps(vista)
    def vista_envuelta(**kwargs):
        if (session['perfil'] == 2):
            return redirect(url_for('main.productos'))
        return vista(**kwargs)

    return vista_envuelta


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/pro/')
def product():

    db = get_db()

    db.row_factory = sqlite3.Row
    filas = db.execute("SELECT * FROM Producto").fetchall()
    db.close()

    producto = []
    for item in filas:
        producto.append({k: item[k] for k in item.keys()})

    return jsonify(producto)


@main.route('/usu/')
def usu():

    db = get_db()

    db.row_factory = sqlite3.Row
    filas = db.execute("select idPersona, nombres, telefono, direccion, correoElectronico, idPerfil, fechaRegistro from Persona")

    persona = []
    for item in filas:
        persona.append({k: item[k] for k in item.keys()})

    db.close()
    
    return jsonify(persona)


@main.route('/prov/')
def prov():

    db = get_db()

    db.row_factory = sqlite3.Row
    filas = db.execute("select * from Proveedor")

    proveedor = []
    for item in filas:
        proveedor.append({k: item[k] for k in item.keys()})

    db.close()
    
    return jsonify(proveedor)


@main.route('/loginAdmin/', methods=['GET', 'POST'])
def loginPro():

    if(request.method == 'POST'):

        correo = request.form['correo']
        contraseña = request.form['contraseña']
        db = get_db()

        user = db.execute(
            "select * from Persona where correoElectronico = ?", (correo,)).fetchone()
        db.commit()
        db.close()

        if user is not None:
            sw = check_password_hash(user[5], contraseña)
            perfil = (user[6])

            if(sw):

                session['id'] = user[0]
                session['nombre'] = user[1]
                session['direccion'] = user[2]
                session['celular'] = user[3]
                session['correo'] = user[4]
                session['perfil'] = user[6]

                if(perfil == 3):
                    return redirect(url_for('main.InicioAdmin'))
                elif(perfil == 2):
                    return redirect(url_for('main.productos'))
        flash('Usuario o clave incorrecta.')
    return render_template('loginAdmin.html')


@main.route('/InicioAdmin/')
@login_required
@restriccion_administrador
def InicioAdmin():
    return render_template('dashAdmin.html')


@main.route('/loginEmpleado/', methods=['GET', 'POST'])
def loginEmpleado():

    if (request.method == 'POST'):
        correo = request.form['correo']
        contraseña = request.form['contraseña']

        db = get_db()

        user = db.execute(
            "select * from Persona where correoElectronico = ?", (correo,)).fetchone()
        db.commit()
        db.close()

        if user is not None:
            sw = check_password_hash(user[5], contraseña)
            perfil = (user[6])

            print(perfil)

            if(sw):

                session['id'] = user[0]
                session['nombre'] = user[1]
                session['direccion'] = user[2]
                session['celular'] = user[3]
                session['correo'] = user[4]
                session['perfil'] = user[6]

                if(perfil == 1):
                    return redirect(url_for('main.dashEmpleado'))
        flash('Usuario o clave incorrecta.')
    return render_template('loginEmp.html')


@main.route('/dashEmpleado/')
@login_required
def dashEmpleado():
    return render_template('dashEmpleado.html')


@main.route('/cerrarSesion/')
def cerrarSesion():
    session.clear()
    return render_template('index.html')


@main.route('/productos/')
@login_required
def productos():
    return render_template('dashProducto.html')


@main.route('/listaProductos/')
@login_required
def listaProductos():
    return render_template('listaProductos.html')


@main.route('/nuevoProducto/', methods=['GET', 'POST'])
@login_required
@restriccion_trabajador
def nuevoProducto():

    if(request.method == 'POST'):

        Id = request.form['id']
        Nombre = request.form['nombre']
        Descripcion = request.form['descripcion']
        #Proveedor = request.form['proveedor']
        CantidadBodega = request.form['bodega']
        CantidadDisponible = request.form['minima']

        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        db.execute("insert into Producto (idProducto, nombreProducto, descripcion, cantidadBodega, cantidadDisponible, fechaRegistro) values('{0}', '{1}', '{2}', '{3}', '{4}', '24/10/2021')".format(
            Id, Nombre, Descripcion, CantidadBodega, CantidadDisponible))

        db.commit()

        db.close()

        return render_template('dashProducto.html')

    return render_template('crearProducto.html')


@main.route('/verProducto/<pos>/')
@login_required
def verProducto(pos):
    return render_template('verProducto.html', dato={"pos": pos})


@main.route('/editarB-P/')
@login_required
def editarB_P():
    return render_template('editarProducto.html')


@main.route('/editarL-P/<pos>/', methods = ['GET', 'POST'])
@login_required
def editarL_P(pos):

    dato = int(pos)

    if(request.method == 'POST'):
        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        filas = db.execute("SELECT * FROM Producto").fetchall()

        v = filas[dato]

        id = int(v[0])

        nombreP = request.form['nombreEdit']
        descripcionP = request.form['descripcionEdit']
        cantidad = request.form['bodegaEdit']
        cantidadD = request.form['minimaEdit']

        db.execute("update Producto set nombreProducto = '{0}', descripcion = '{1}', cantidadBodega = '{2}', cantidadDisponible = '{3}' where idProducto = '{4}'".format(nombreP, descripcionP, cantidad, cantidadD, id))
        
        db.commit()

        db.close()

    db = get_db()
    db = sqlite3.connect('InventarioSony.db')

    filas = db.execute("SELECT * FROM Producto").fetchall()

    v = filas[dato]

    nombre = v[1]
    descripcion = v[2]
    bodega = v[3]
    Minbodega = v[4]


    db.close()

    return render_template('editarProductoLista.html', datos = [nombre, descripcion, bodega, Minbodega])


@main.route('/cancelarL_P/')
@login_required
def cancelarL_P():
    return render_template('listaProductos.html')


@main.route('/cancelarE_B_P/')
def cancelarE_B_P():
    return render_template('buscarProducto.html')


@main.route('/buscarProducto/', methods = ['GET', 'POST'])
@login_required
def buscarProducto():

    if(request.method == 'POST'):

        buscar = request.form['buscar']
        valor = request.form['dato']

        if(buscar == 'Id'):
            buscar = 'idProducto'
        elif(buscar == 'Nombre'):
            buscar = 'nombreProducto'

        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        filas = db.execute("SELECT * FROM Producto WHERE {0} = '{1}'".format(buscar, valor)).fetchall()

        db.close()

        datos = []

        for item in filas:
            datos = ({'id': item[0], 'nombre': item[1], 'descripcion': item[3], 'bodega': item[4], 'minBodega': item[5]})


        return render_template('buscarProducto.html', datos = datos)

    return render_template('buscarProducto.html')


@main.route('/eliminarProducto/<pos>/')
@login_required
def eliminarProducto(pos):

    dato = int(pos)

    db = get_db()
    db = sqlite3.connect('InventarioSony.db')

    filas = db.execute("SELECT * FROM Producto").fetchall()

    v = filas[dato]

    idP = v[0]

    db.execute("DELETE FROM Producto WHERE idProducto = '{0}'".format(idP))
    db.commit()
    db.close()

    return render_template('listaProductos.html')


@main.route('/indexProveedor/')
@login_required
@restriccion_administrador
def proveedores():
    return render_template('dashProveedor.html')


@main.route('/crearProveedor/', methods=['GET', 'POST'])
@login_required
@restriccion_trabajador
@restriccion_administrador
def crearProveedor():

    if(request.method == 'POST'):

        Nit = request.form['Nit']
        RazonSocial = request.form['RazonSocial']
        Direccion = request.form['Direccion']
        Celular = request.form['Telefono']

        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        db.execute("insert into Proveedor (nit, razonSocial, direccion, telefono, fechaRegistro) values('{0}', '{1}', '{2}', '{3}','00/00/0000')".format(
            Nit, RazonSocial, Direccion, Celular))

        db.commit()
    
        db.close()

        return render_template('dashProveedor.html')

    return render_template('crearProveedor.html')


@main.route('/listaProveedores/')
@login_required
@restriccion_administrador
def listaProveedores():
    return render_template('listaProveedores.html')


@main.route('/cancelar/')
@login_required
@restriccion_administrador
def cancelar():
    return render_template('dashProveedor.html')


@main.route('/eliminarProveedor/<pos>/')
@login_required
@restriccion_administrador
def eliminarProveedor(pos):

    dato = int(pos)

    db = get_db()
    db = sqlite3.connect('InventarioSony.db')

    filas = db.execute("SELECT * FROM Proveedor").fetchall()

    v = filas[dato]

    idP = v[0]

    db.execute("DELETE FROM Proveedor WHERE nit = '{0}'".format(idP))
    db.commit()
    db.close()

    return render_template('listaProveedores.html')


@main.route('/buscarProveedor/', methods = ['GET', 'POST'])
@login_required
@restriccion_administrador
def buscarProveedor():
    if (request.method == 'POST'):

        valor = request.form['Nit']

        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        filas = db.execute("SELECT * FROM Proveedor WHERE  nit = '{0}'".format(valor)).fetchall()
        
        db.close()
        
        datos = []

        for item in filas:
            datos = ({'nit': item[0], 'razon': item[1], 'direccion': item[2], 'telefono': item[3]})
        
        return render_template('buscarProveedor.html', datos = datos)
        

    return render_template('buscarProveedor.html')


@main.route('/editarProveedorL/<pos>/', methods = ['GET', 'POST'])
@login_required
@restriccion_administrador
def editarProveedorL(pos):

    dato = int(pos)

    if(request.method == 'POST'):
        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        filas = db.execute("SELECT * FROM Proveedor").fetchall()

        v = filas[dato]

        nit = int(v[0])

        razonS = request.form['RazonSocial']
        direccionP = request.form['Direccion']
        telefonoP = request.form['Telefono']

        db.execute("update Proveedor set razonSocial = '{0}', direccion = '{1}', telefono = '{2}' where nit = '{3}'".format(razonS, direccionP, telefonoP, nit))
        
        db.commit()

        db.close()
    
    db = get_db()
    db = sqlite3.connect('InventarioSony.db')

    filas = db.execute("SELECT * FROM Proveedor").fetchall()

    v = filas[dato]

    razon = v[1]
    direccion = v[2]
    telefono = v[3]

    db.close()

    return render_template('editarProveedores.html', datos = [razon, direccion, telefono])


@main.route('/editarProveedorB/')
@login_required
@restriccion_administrador
def editarProveedorB():
    return render_template('editarProveedores.html')


@main.route('/usuarios/')
@login_required
@restriccion_trabajador
def usuarios():
    return render_template('dashUsuario.html')


@main.route('/crearUsuario/', methods=['GET', 'POST'])
@login_required
@restriccion_administrador
def crearUsuario():

    if(request.method == 'POST'):

        Id = request.form['id']
        Nombre = request.form['nombre']
        Direccion = request.form['direccion']
        Celular = request.form['celular']
        Correo = request.form['correoElectronico']
        Contraseña = request.form['contraseña']
        Perfil = request.form['perfil']

        db = get_db()

        Contraseña = generate_password_hash(Contraseña)
        db.execute("insert into Persona (idPersona, nombres, direccion, telefono, correoElectronico, contrasena, idPerfil) values (?, ?, ?, ?, ?, ?, ?)",(Id, Nombre, Direccion, Celular, Correo, Contraseña, Perfil))
        db.commit()
        db.close()

        return render_template('index.html')

    return render_template('crearUsuario.html')


@main.route('/crearUsuarioLog/', methods=['GET', 'POST'])
def crearUsuarioLog():

    if(request.method == 'POST'):

        Id = request.form['id']
        Nombre = request.form['nombre']
        Direccion = request.form['direccion']
        Celular = request.form['celular']
        Correo = request.form['correoElectronico']
        Contraseña = request.form['contraseña']
        Perfil = request.form['perfil']

        db = get_db()

        Contraseña = generate_password_hash(Contraseña)
        db.execute("insert into Persona (idPersona, nombres, direccion, telefono, correoElectronico, contrasena, idPerfil) values (?, ?, ?, ?, ?, ?, ?)",(Id, Nombre, Direccion, Celular, Correo, Contraseña, Perfil))
        db.commit()
        db.close()

        return render_template('index.html')

    return render_template('crearUsuarioLog.html')


@main.route('/listaUsuarios/')
@login_required
@restriccion_trabajador
def listaUsuario():
    return render_template('listaUsuarios.html')


@main.route('/borrarUsuario/<pos>/')
@login_required
@restriccion_trabajador
def borrarUsuario(pos):

    dato = int(pos)

    db = get_db()
    db = sqlite3.connect('InventarioSony.db')

    filas = db.execute("SELECT * FROM Persona").fetchall()

    v = filas[dato]

    idP = v[0]

    db.execute("DELETE FROM Persona WHERE idPersona = '{0}'".format(idP))
    db.commit()
    db.close()

    return render_template('listaUsuarios.html')


@main.route('/miPerfil/')
@login_required
def miPerfil():
    return render_template('miPerfil.html')


@main.route('/editarDatos/', methods = ['GET', 'POST'])
@login_required
def editarDatos():

    if(request.method == 'POST'):

        db = get_db()
        db = sqlite3.connect('InventarioSony.db')

        id = int(session['id'])

        nombres = request.form['nombre']
        direccionP = request.form['direccion']
        celularP = request.form['celular']

        db.execute("update Persona set nombres = '{0}', direccion = '{1}', telefono = '{2}' where idPersona = '{3}'".format(nombres, direccionP, celularP, id))

        db.commit()

        db.close()

        #return render_template('miPerfil.html')

    return render_template('editarDatos.html')


@main.route('/cambiarContraseña/')
@login_required
def cambiarContraseña():
    return render_template('cambiarContraseña.html')


@main.route('/olvideContraseña/', methods = ['GET', 'POST'])
def olvideContraseña():

    if(request.method == 'POST'):

        return render_template('index.html')

    return render_template('recuperarContraseña.html')