import { Http, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { LojaModel } from "./Loja-model";
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import {PessoaService} from '../Pessoa/Pessoa-service'
import { AuthService } from '../login/auth-service'

const Loja_API = `${BASE_PATH_SERVER}/Loja`


@Injectable()
export class LojaService{

    static currentLoja: LojaModel

    constructor(private http: Http){
    }

    allLojas():Observable<Response>{
        return this.http.get(
            Loja_API
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    lojasByNome(text: string):Observable<Response>{
        return this.http.get(
            `${Loja_API}?nome=${text}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    lojasByCEP():Observable<Response>{
        return this.http.get(
            `${Loja_API}?CEP=${PessoaService.currentPessoa.CEP}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    delete(loja_id: number): void{
        this.http.delete(
            `${Loja_API}/${loja_id}`
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:LojaModel = (<LojaModel>obj.data)
                console.log('"Loja.Delete" = ', data)
            }
        )
    }

    saveLoja(newItem: LojaModel): void{
        this.http.post(
            Loja_API,
            JSON.stringify(newItem)
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:LojaModel = (<LojaModel>obj.data)
                console.log('"saveLoja" = ', data)
            }
        )
    }

}