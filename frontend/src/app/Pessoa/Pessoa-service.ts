import { Http, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "../../../node_modules/rxjs";
import { PessoaModel } from "./Pessoa-model";
import { Router } from '@angular/router';
import { RespJsonFlask, BASE_PATH_SERVER } from "../app.api";
import { AuthService } from '../login/auth-service'

const Pessoa_API = `${BASE_PATH_SERVER}/Pessoa`


@Injectable()
export class PessoaService{

    static pessoaLogin: PessoaModel
    static currentPessoa: PessoaModel
    static selectedImage: string

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
            ,new RequestOptions({headers: AuthService.header})
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
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    pessoasByName(text: string):Observable<Response>{
        return this.http.get(
            `${Pessoa_API}?nome=${text}`
            ,new RequestOptions({headers: AuthService.header})
        )
    }

    delete(pessoa_id: number): void{
        if(pessoa_id == PessoaService.pessoaLogin.pessoa_id){
            alert('Você não pode deletar você mesmo.')
            return
        }
        this.http.delete(
            `${Pessoa_API}/${pessoa_id}`
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                let data:PessoaModel = (<PessoaModel>obj.data)
                console.log('"Pessoa.Delete" = ', data)
            }
        )
    }

    savePessoa(newPessoa: PessoaModel): void{
        newPessoa.foto = PessoaService.selectedImage
        this.http.post(
            Pessoa_API,
            JSON.stringify(newPessoa)
            ,new RequestOptions({headers: AuthService.header})
        ).subscribe(
            resp => {
                const obj:RespJsonFlask = (<RespJsonFlask>resp.json())
                console.log('Resposta da inclusão de Pessoa: ', obj)
                PessoaService.currentPessoa = newPessoa
                if(!PessoaService.isAdmin())
                    this.router.navigate(['new-Fila'])
            }
        )
    }

}