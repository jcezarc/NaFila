import json
from flask_restful import Resource
from flask import request, jsonify
from service.Pessoa_service import PessoaService

class AllPessoa(Resource):
    def get(self):
        """
        Returns all records from the table Pessoa

        #Read
        """
        service = PessoaService()
        return service.find(request.args)
    
    def post(self):
        """
        Write a new record in Pessoa

        #Write
        """
        req_data = request.get_json()
        service = PessoaService()
        return service.insert(req_data)

    def put(self):
        """
        Updates a record in Pessoa

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = PessoaService()
        return service.update(req_data)
