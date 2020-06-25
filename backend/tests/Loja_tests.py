import sys
sys.path.append('..')
from service.Loja_service import LojaService
from model.Loja_model import LojaModel, PK_DEFAULT_VALUE
from util.db.fake_table import FakeTable
from util.messages import resp_ok, resp_not_found, GET_NOT_FOUND_MSG

def test_find_success():
    table = FakeTable(LojaModel)
    record = table.default_values()
    table.insert(record)
    service = LojaService(table)
    status_code = service.find(None, PK_DEFAULT_VALUE)[1]
    assert status_code == 200

def test_find_failure():
    service = LojaService(FakeTable(LojaModel))
    message = service.find(None, PK_DEFAULT_VALUE)[0]
    assert message == GET_NOT_FOUND_MSG

def test_insert_success():
    table = FakeTable(LojaModel)
    service = LojaService(table)
    record = table.default_values()
    status_code = service.insert(record)[1]
    assert status_code == 201

def test_insert_failure():
    service = LojaService(FakeTable(LojaModel))
    status_code = service.insert({})[1]
    assert status_code == 400
