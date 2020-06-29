from marshmallow import Schema
from marshmallow.fields import Str, Nested, List, Integer, Float, Date, Boolean


PK_DEFAULT_VALUE = 0

class PessoaModel(Schema):
    pessoa_id = Integer(primary_key=True, default=PK_DEFAULT_VALUE)
    nome = Str(default='')
    tipo = Str(default='')
    telefone = Str(required=True, default='')  #--- Dados de Login
    CEP = Str(default='')
    endereco = Str(default='')
    foto = Str(default='')
    senha = Str(required=True, default='')   #--- Dados de Login
