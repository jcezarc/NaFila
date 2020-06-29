import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { AddressModel } from "./ZipCode-model";


@Injectable()
export class ZipCodeService{

    constructor(
        private http: Http
    ){}
  
    getAddress(zipCode: string):Observable<Response>{
        return this.http.get(
            `https://viacep.com.br/ws/${zipCode}/json`
        )
    }

}
