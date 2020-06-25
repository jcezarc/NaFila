import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { FilaModel } from "./Fila-model";
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import { PessoaService } from '../Pessoa/Pessoa-service'

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
            )
        }else{
            return this.filaByPessoa()
        }
    }

    filasById(text: string):Observable<Response>{
        return this.http.get(
            `${Fila_API}?fila_id=${text}`,
        )
    }

    filaByPessoa():Observable<Response>{
        return this.http.get(
            `${Fila_API}?pessoa=${PessoaService.currentPessoa.pessoa_id}`,
        )
    }

    filaByLoja(loja_id:number):Observable<Response>{
        return this.http.get(
            `${Fila_API}?loja=${loja_id}`,
        )
    }

    delete(fila_id: string): void{
        this.http.delete(
            `${Fila_API}/${fila_id}`
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:FilaModel = (<FilaModel>obj.data)
            }
        )
    }

    saveFila(newItem: FilaModel): void{
        const headers: Headers = new Headers()
        headers.append('Content-Type','application/json')
        headers.append('Access-Control-Allow-Origin','*')
        this.http.post(
            Fila_API,
            // JSON.stringify(newItem),
            newItem,
            new RequestOptions({headers:headers})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:FilaModel = (<FilaModel>obj.data)
            }
        )
    }

}