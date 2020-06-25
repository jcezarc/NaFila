from marshmallow import Schema
from marshmallow.fields import Str, Nested, List, Integer, Float, Date, Boolean


PK_DEFAULT_VALUE = 0

class LojaModel(Schema):
    loja_id = Integer(primary_key=True, default=PK_DEFAULT_VALUE)
    nome = Str(required=True, default='')
    melhor_hora = Str(default='')
    endereco = Str(required=True, default='')
    logotipo = Str(default='')
    atend_especial = Str(default='') # -- Atendimento especial para Deficientes, Idosos, Grávidas etc.
