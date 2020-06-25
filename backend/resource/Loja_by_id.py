from flask_restful import Resource
from service.Loja_service import LojaService

class LojaById(Resource):
    def get(self, loja_id):
        """
        Search in  Loja by the filed loja_id

        #Read
        """
        service = LojaService()
        return service.find(None, loja_id)

    def delete(self, loja_id):
        """
        Delete a record of Loja

        #Write
        """
        service = LojaService()
        return service.delete([loja_id])
