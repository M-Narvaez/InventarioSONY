from flask import Flask
import os

def create_app():
    app = Flask(__name__)

    from views import main

    app.secret_key = 'inventariosony'

    #app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///InventarioSony.db'

    app.register_blueprint(main)
    return app