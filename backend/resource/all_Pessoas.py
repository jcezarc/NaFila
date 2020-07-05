import json
from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from service.Pessoa_service import PessoaService

class AllPessoa(Resource):

    @jwt_required
    def get(self):
        """
        Returns all records from the table Pessoa

        #Read
        """
        service = PessoaService()
        return service.find(request.args)
    
    @jwt_required
    def post(self):
        """
        Write a new record in Pessoa

        #Write
        """
        req_data = request.get_json()
        service = PessoaService()
        return service.insert(req_data)

    @jwt_required
    def put(self):
        """
        Updates a record in Pessoa

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = PessoaService()
        return service.update(req_data)
