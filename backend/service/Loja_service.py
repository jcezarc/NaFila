import logging
from model.Loja_model import LojaModel
from util.messages import (
    resp_error,
    resp_not_found,
    resp_post_ok,
    resp_get_ok,
    resp_ok
)
from service.db_connection import get_table

def cep_conditions(txt):
    regiao = int(txt[:3])
    ini = '{:03d}'.format(regiao-5)
    fim = '{:03d}'.format(regiao+5)
    result = f"cep > '{ini}' AND cep < '{fim}'"
    return result

class LojaService:
    def __init__(self, table=None):
        if table:
            self.table = table
        else:
            self.table = get_table(LojaModel)

    def find(self, params, loja_id=None):
        if loja_id:
            logging.info(f'Finding "{loja_id}" in Loja ...')
            found = self.table.find_one([loja_id])
        else:
            logging.info('Finding all records of Loja...')
            self.table.new_condition_event['CEP'] = cep_conditions
            found = self.table.find_all(
                20,
                self.table.get_conditions(params, False)
            )
        if not found:
            return resp_not_found()
        return resp_get_ok(found)

    def insert(self, json):
        logging.info('New record write in Loja')
        errors = self.table.insert(json)
        if errors:
            return resp_error(errors)
        return resp_post_ok()

    def update(self, json):
        logging.info('Changing record of Loja ...')
        errors = self.table.update(json)
        if errors:
            return resp_error(errors)
        return resp_ok("Record changed OK!")
        
    def delete(self, loja_id):
        logging.info('Removing record of Loja ...')
        self.table.delete(loja_id)
        return resp_ok("Deleted record OK!")
