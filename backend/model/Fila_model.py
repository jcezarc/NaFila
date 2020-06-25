from marshmallow import Schema
from marshmallow.fields import Str, Nested, List, Integer, Float, Date, Boolean
from model.Loja_model import LojaModel
from model.Pessoa_model import PessoaModel


PK_DEFAULT_VALUE = 0

class FilaModel(Schema):
    fila_id = Integer(primary_key=True, default=PK_DEFAULT_VALUE)
    posicao = Integer(required=True)
    avaliacao = Str(required=True)
    loja = Nested(LojaModel)
    pessoa = Nested(PessoaModel)

