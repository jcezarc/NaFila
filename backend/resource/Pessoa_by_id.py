from flask_restful import Resource
from flask_jwt_extended import jwt_required
from service.Pessoa_service import PessoaService

class PessoaById(Resource):

    @jwt_required
    def get(self, pessoa_id):
        """
        Search in  Pessoa by the filed pessoa_id

        #Read
        """
        service = PessoaService()
        return service.find(None, pessoa_id)

    @jwt_required
    def delete(self, pessoa_id):
        """
        Delete a record of Pessoa

        #Write
        """
        service = PessoaService()
        return service.delete([pessoa_id])
