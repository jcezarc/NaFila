# -*- coding: utf-8 -*-
import os
import logging
import uuid
from flask import Flask, Blueprint, jsonify, request
from flask_restful import Api
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from flask_jwt_extended import create_access_token, JWTManager
from resource.user_controller import valid_user
from util.swagger_generator import FlaskSwaggerGenerator
from model.Loja_model import LojaModel
from resource.Loja_by_id import LojaById
from resource.all_Lojas import AllLoja
from model.Pessoa_model import PessoaModel
from resource.Pessoa_by_id import PessoaById
from resource.all_Pessoas import AllPessoa
from model.Fila_model import FilaModel
from resource.Fila_by_id import FilaById
from resource.all_Filas import AllFila


BASE_PATH = '/NaFila'

def config_routes(app):
    api = Api(app)
    #--- Resources: ----
    api.add_resource(LojaById, f'{BASE_PATH}/Loja/<loja_id>', methods=['GET'], endpoint='get_Loja_by_id')
    api.add_resource(AllLoja, f'{BASE_PATH}/Loja', methods=['GET'], endpoint='get_AllLoja')
    api.add_resource(AllLoja, f'{BASE_PATH}/Loja', methods=['POST'], endpoint='post_Loja')
    api.add_resource(AllLoja, f'{BASE_PATH}/Loja', methods=['PUT'], endpoint='put_Loja')
    api.add_resource(LojaById, f'{BASE_PATH}/Loja/<loja_id>', methods=['DELETE'], endpoint='delete_Loja')
    api.add_resource(PessoaById, f'{BASE_PATH}/Pessoa/<pessoa_id>', methods=['GET'], endpoint='get_Pessoa_by_id')
    api.add_resource(AllPessoa, f'{BASE_PATH}/Pessoa', methods=['GET'], endpoint='get_AllPessoa')
    api.add_resource(AllPessoa, f'{BASE_PATH}/Pessoa', methods=['POST'], endpoint='post_Pessoa')
    api.add_resource(AllPessoa, f'{BASE_PATH}/Pessoa', methods=['PUT'], endpoint='put_Pessoa')
    api.add_resource(PessoaById, f'{BASE_PATH}/Pessoa/<pessoa_id>', methods=['DELETE'], endpoint='delete_Pessoa')
    api.add_resource(FilaById, f'{BASE_PATH}/Fila/<fila_id>', methods=['GET'], endpoint='get_Fila_by_id')
    api.add_resource(AllFila, f'{BASE_PATH}/Fila', methods=['GET'], endpoint='get_AllFila')
    api.add_resource(AllFila, f'{BASE_PATH}/Fila', methods=['POST'], endpoint='post_Fila')
    api.add_resource(AllFila, f'{BASE_PATH}/Fila', methods=['PUT'], endpoint='put_Fila')
    api.add_resource(FilaById, f'{BASE_PATH}/Fila/<fila_id>', methods=['DELETE'], endpoint='delete_Fila')
    
    #-------------------

def set_swagger(app):
    swagger_url = '/docs'
    swaggerui_blueprint = get_swaggerui_blueprint(
        swagger_url,
        '/api',
        config={
            'app_name': "*- NaFila -*"
        }
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=swagger_url)


def swagger_details(args):
    id_route = args[0]
    params = args[1]
    model = None
    resource = None
    docstring = ""
    if id_route == 'docs':
        docstring = """Swagger documentation
        #Doc
        """
    elif id_route == 'Loja':
        if not params:
            resource = AllLoja
        else:
            resource = LojaById
        model = LojaModel()
    elif id_route == 'Pessoa':
        if not params:
            resource = AllPessoa
        else:
            resource = PessoaById
        model = PessoaModel()
    elif id_route == 'Fila':
        if not params:
            resource = AllFila
        else:
            resource = FilaById
        model = FilaModel()
    
    ignore = False
    return model, resource, docstring, ignore

logging.basicConfig(
    filename='loja.log',
    format='%(asctime)s %(levelname)-8s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S'
)

APP = Flask(__name__)
CORS(APP)
APP.config['JWT_SECRET_KEY'] = str(uuid.uuid4())
JWT = JWTManager(APP)
config_routes(APP)
set_swagger(APP)

@APP.route('/api')
def get_api():
    """
    API json data

    #Doc
    """
    generator = FlaskSwaggerGenerator(
        swagger_details,
        None
    )
    return jsonify(generator.content)

@APP.route('/health')
def health():
    return 'OK', 200

@APP.route('/handshake', methods=['POST'])
def handshake():
    user = request.json.get('user')
    password = request.json.get('password')
    found, user_id = valid_user(user, password)
    if not found:
        return "Invalid user", 403
    access_token = create_access_token(identity=user_id)
    return jsonify(access_token=access_token), 200

if __name__ == '__main__':
    APP.run(
        debug=True,
        port=os.environ.get('PORT', 5000),
        host='0.0.0.0'
    )
