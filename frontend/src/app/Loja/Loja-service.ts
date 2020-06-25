import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { LojaModel } from "./Loja-model";
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import {PessoaService} from '../Pessoa/Pessoa-service'
import {PessoaModel} from '../Pessoa/Pessoa-model'

const Loja_API = `${BASE_PATH_SERVER}/Loja`


@Injectable()
export class LojaService{

    static currentLoja: LojaModel

    constructor(private http: Http){
    }

    allLojas():Observable<Response>{
        return this.http.get(
            Loja_API
        )
    }

    lojasByNome(text: string):Observable<Response>{
        return this.http.get(
            `${Loja_API}?nome=${text}`,
        )
    }

    lojasByAtendEspec(pessoa: PessoaModel):Observable<Response>{
        return this.http.get(
            `${Loja_API}?atend_especial=${pessoa.tipo}`,
        )
    }

    delete(loja_id: number): void{
        this.http.delete(
            `${Loja_API}/${loja_id}`
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:LojaModel = (<LojaModel>obj.data)
                console.log('"Loja.Delete" = ', data)
            }
        )
    }

    saveLoja(newItem: LojaModel): void{
        const headers: Headers = new Headers()
        headers.append('Content-Type','application/json')
        headers.append('Access-Control-Allow-Origin','*')
        this.http.post(
            Loja_API,
            JSON.stringify(newItem),
            new RequestOptions({headers:headers})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:LojaModel = (<LojaModel>obj.data)
                console.log('"saveLoja" = ', data)
            }
        )
    }

}