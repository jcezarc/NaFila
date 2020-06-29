import logging
from model.Fila_model import FilaModel
from util.messages import (
    resp_error,
    resp_not_found,
    resp_post_ok,
    resp_get_ok,
    resp_ok
)
from service.db_connection import get_table

class FilaService:
    def __init__(self, table=None):
        if table:
            self.table = table
        else:
            self.table = get_table(FilaModel)

    def find(self, params, fila_id=None):
        if fila_id:
            logging.info(f'Finding "{fila_id}" in Fila ...')
            found = self.table.find_one([fila_id])
        else:
            logging.info('Finding all records of Fila...')
            found = self.table.find_all(
                20,
                self.table.get_conditions(params, False)
            )
        if not found:
            return resp_not_found()
        return resp_get_ok(found)

    def insert(self, json):
        logging.info('New record write in Fila')
        errors = self.table.insert(json)
        if errors:
            return resp_error(errors)
        return resp_post_ok()

    def update(self, json):
        logging.info('Changing record of Fila ...')
        errors = self.table.update(json)
        if errors:
            return resp_error(errors)
        return resp_ok("Record changed OK!")
        
    def delete(self, fila_id):
        logging.info('Removing record of Fila ...')
        self.table.delete(fila_id)
        return resp_ok("Deleted record OK!")
