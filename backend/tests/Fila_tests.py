import sys
sys.path.append('..')
from service.Fila_service import FilaService
from model.Fila_model import FilaModel, PK_DEFAULT_VALUE
from util.db.fake_table import FakeTable
from util.messages import resp_ok, resp_not_found, GET_NOT_FOUND_MSG

def test_find_success():
    table = FakeTable(FilaModel)
    record = table.default_values()
    table.insert(record)
    service = FilaService(table)
    status_code = service.find(None, PK_DEFAULT_VALUE)[1]
    assert status_code == 200

def test_find_failure():
    service = FilaService(FakeTable(FilaModel))
    message = service.find(None, PK_DEFAULT_VALUE)[0]
    assert message == GET_NOT_FOUND_MSG

def test_insert_success():
    table = FakeTable(FilaModel)
    service = FilaService(table)
    record = table.default_values()
    status_code = service.insert(record)[1]
    assert status_code == 201

def test_insert_failure():
    service = FilaService(FakeTable(FilaModel))
    status_code = service.insert({})[1]
    assert status_code == 400
