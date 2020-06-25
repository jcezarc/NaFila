from marshmallow import Schema
from marshmallow.fields import Str, Nested, List, Integer, Float, Date, Boolean


PK_DEFAULT_VALUE = 0

class LojaModel(Schema):
    loja_id = Integer(primary_key=True, default=PK_DEFAULT_VALUE)
    nome = Str(required=True)
    melhor_hora = Str()
    endereco = Str(required=True)
    logotipo = Str()
    atend_especial = Str() # -- Atendimento especial para Deficientes, Idosos, Grávidas etc.
