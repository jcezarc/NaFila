from marshmallow import Schema
from marshmallow.fields import Str, Nested, List, Integer, Float, Date, Boolean


PK_DEFAULT_VALUE = 0

class LojaModel(Schema):
    loja_id = Integer(primary_key=True, default=PK_DEFAULT_VALUE)
    nome = Str(default='')
    melhor_hora = Str(default='')
    CEP = Str(default='')
    endereco = Str(default='')
    logotipo = Str(default='')
