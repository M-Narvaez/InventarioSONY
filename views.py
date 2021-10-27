import sqlite3
import functools
from flask import Flask, render_template, blueprints, request, jsonify, url_for,  redirect, session, flash
from producto import producto
from usuario import usuario
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


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/pro/')
def product():
    return jsonify(producto)


@main.route('/user/')
def user():
    return jsonify(usuario)


@main.route('/loginAdmin/', methods=['GET', 'POST'])
def loginPro():

    if(request.method == 'POST'):

        correo = request.form['correo']
        contraseña = request.form['contraseña']
        db = get_db()

        #sql = "select * from Persona where correoElectronico = '{0}' and contrasena = '{1}' and idPerfil = '2' or idPerfil = '3'".format(correo, contraseña)
        user = db.execute(
            "select * from Persona where correoElectronico = ?", (correo,)).fetchone()
        db.commit()
        db.close()

        if user is not None:
            sw = check_password_hash(user[5], contraseña)
            perfil = (user[6])

            if(sw):

                session['nombre'] = user[1]
                session['correo'] = user[4]
                session['perfil'] = user[6]

                if(perfil == 2 or perfil == 3):
                    return redirect(url_for('main.InicioAdmin'))
        flash('Usuario o clave incorrecta.')
    return render_template('loginAdmin.html')


@main.route('/InicioAdmin/')
@login_required
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

                session['nombre'] = user[1]
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
    #pro = modelo.producto(id = 2200, nombre = 'Xperia Mark', descripcion = 'Smartphone Photograpic', cantidadBodega = 350, cantidadMinima = 100)
    return render_template('listaProductos.html')


@main.route('/nuevoProducto/', methods=['GET', 'POST'])
@login_required
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


@main.route('/editarL-P/')
@login_required
def editarL_P():
    return render_template('editarProductoLista.html')


@main.route('/cancelarL_P/')
@login_required
def cancelarL_P():
    return render_template('listaProductos.html')


@main.route('/indexProveedor/')
@login_required
def proveedores():
    return render_template('dashProveedor.html')


@main.route('/crearProveedor/', methods=['GET', 'POST'])
@login_required
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

        return render_template('dashProveedor.html')

    return render_template('crearProveedor.html')


@main.route('/cancelar/')
@login_required
def cancelar():
    return render_template('dashProveedor.html')


@main.route('/usuarios/')
@login_required
def usuarios():
    return render_template('dashUsuario.html')


@main.route('/crearUsuario/', methods=['GET', 'POST'])
@login_required
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


@main.route('/listaUsuarios/')
@login_required
def listaUsuario():
    return render_template('listaUsuarios.html')


@main.route('/miPerfil/')
@login_required
def miPerfil():
    return render_template('miPerfil.html')
