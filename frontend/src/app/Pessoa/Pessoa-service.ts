import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { PessoaModel } from "./Pessoa-model";
import { Router } from '@angular/router';
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";

const Pessoa_API = `${BASE_PATH_SERVER}/Pessoa`


@Injectable()
export class PessoaService{

    static pessoaLogin: PessoaModel
    static currentPessoa: PessoaModel
    static selectedImage: string

    static tipos(comAcento:Boolean): string[] {
        if(comAcento){
            return [
                'Admin',
                'Não-Preferencial',
                'Grávida/Idoso',
                'Deficiente'
            ]
        }else{
            return [
                'Admin',
                'NaoPreferencial',
                'GravidaIdoso',
                'Deficiente'
            ]
        }
    }

    static isAdmin(){
        if(!PessoaService.pessoaLogin){
            return false
        }else{
            return PessoaService.pessoaLogin.tipo == "Admin"
        }
    }

    nextUrl():string{
        if (PessoaService.isAdmin()){
            return 'Fila' // Fila List
        }else{
            return '/new-Fila'
        }
    }

    pessoaLogin(params: PessoaModel):void{
        this.http.get(
            `${Pessoa_API}?telefone=${params.telefone}&senha=${params.senha}`
        ).subscribe(
            (resp) => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                const pessoa:PessoaModel = (<PessoaModel> (obj.data) ? obj.data[0] : null)
                PessoaService.pessoaLogin = pessoa
                PessoaService.currentPessoa = pessoa
                if (pessoa){
                    this.router.navigate([this.nextUrl()])
                }else{
                    alert('Dados incorretos.')
                }
            }
        )
    }
    
    constructor(
        private http: Http,
        private router: Router
    ){  }

    allPessoas():Observable<Response>{
        return this.http.get(
            Pessoa_API
        )
    }

    pessoasByName(text: string):Observable<Response>{
        return this.http.get(
            `${Pessoa_API}?nome=${text}`,
        )
    }

    delete(pessoa_id: number): void{
        if(pessoa_id == PessoaService.currentPessoa.pessoa_id){
            alert('Você não pode deletar você mesmo.')
            return
        }
        this.http.delete(
            `${Pessoa_API}/${pessoa_id}`
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:PessoaModel = (<PessoaModel>obj.data)
                console.log('"Pessoa.Delete" = ', data)
            }
        )
    }

    savePessoa(newItem: PessoaModel): void{
        const headers: Headers = new Headers()
        headers.append('Content-Type','application/json')
        headers.append('Access-Control-Allow-Origin','*')
        this.http.post(
            Pessoa_API,
            JSON.stringify(newItem),
            new RequestOptions({headers:headers})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:PessoaModel = (<PessoaModel>obj.data)
                console.log('"savePessoa" = ', data)
            }
        )
    }

}