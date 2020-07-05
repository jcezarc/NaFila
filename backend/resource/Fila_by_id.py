from flask_restful import Resource
from flask_jwt_extended import jwt_required
from service.Fila_service import FilaService

class FilaById(Resource):

    @jwt_required
    def get(self, fila_id):
        """
        Search in  Fila by the filed fila_id

        #Read
        """
        service = FilaService()
        return service.find(None, fila_id)

    @jwt_required
    def delete(self, fila_id):
        """
        Delete a record of Fila

        #Write
        """
        service = FilaService()
        return service.delete([fila_id])
