import json
from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from service.Loja_service import LojaService

class AllLoja(Resource):

    @jwt_required
    def get(self):
        """
        Returns all records from the table Loja

        #Read
        """
        service = LojaService()
        return service.find(request.args)
    
    @jwt_required
    def post(self):
        """
        Write a new record in Loja

        #Write
        """
        req_data = request.get_json()
        service = LojaService()
        return service.insert(req_data)

    @jwt_required
    def put(self):
        """
        Updates a record in Loja

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = LojaService()
        return service.update(req_data)
