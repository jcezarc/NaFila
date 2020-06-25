import json
from flask_restful import Resource
from flask import request, jsonify
from service.Fila_service import FilaService

class AllFila(Resource):
    def get(self):
        """
        Returns all records from the table Fila

        #Read
        """
        service = FilaService()
        return service.find(request.args)
    
    def post(self):
        """
        Write a new record in Fila

        #Write
        """
        req_data = request.get_json()
        service = FilaService()
        return service.insert(req_data)

    def put(self):
        """
        Updates a record in Fila

        #Write
        """
        req_data = json.loads(request.data.decode("utf8"))
        service = FilaService()
        return service.update(req_data)
