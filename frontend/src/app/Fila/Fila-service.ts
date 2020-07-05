import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { FilaModel } from "./Fila-model";
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import { PessoaService } from '../Pessoa/Pessoa-service'
import { AuthService } from '../login/auth-service'

const Fila_API = `${BASE_PATH_SERVER}/Fila`


@Injectable()
export class FilaService{

    static currentFila: FilaModel

    static getCurrFila(){
        if(FilaService.currentFila){
            return FilaService.currentFila.fila_id
        }else{
            return ''
        }
    }

    constructor(private http: Http){
    }

    allFilas():Observable<Response>{
        if(PessoaService.isAdmin()){
            return this.http.get(
                Fila_API
                ,new RequestOptions({headers: AuthService.header})
                )
        }else{
            return this.filaByPessoa()
        }
    }

    filaByPessoa():Observable<Response>{
        return this.http.get(
            `${Fila_API}?pessoa=${PessoaService.currentPessoa.pessoa_id}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    filaByLoja(loja_id:number):Observable<Response>{
        return this.http.get(
            `${Fila_API}?loja=${loja_id}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    delete(fila_id: string): void{
        this.http.delete(
            `${Fila_API}/${fila_id}`
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:FilaModel = (<FilaModel>obj.data)
            }
        )
    }

    saveFila(newItem: FilaModel): void{
        this.http.post(
            Fila_API,
            newItem
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:FilaModel = (<FilaModel>obj.data)
            }
        )
    }

}