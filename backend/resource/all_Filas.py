import json
from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from service.Fila_service import FilaService

class AllFila(Resource):
    
    @jwt_required
    def get(self):
        """
        Returns all records from the table Fila

        #Read
        """
        service = FilaService()
        return service.find(request.args)
    
    @jwt_required
    def post(self):
        """
        Write a new record in Fila

        #Write
        """
        req_data = request.get_json()
        service = FilaService()
        return service.insert(req_data)

    @jwt_required
    def put(self):
        """
        Updates a record in Fila

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = FilaService()
        return service.update(req_data)
