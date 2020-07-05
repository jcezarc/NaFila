import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../Pessoa/Pessoa-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth-service'
import {PessoaModel} from '../Pessoa/Pessoa-model'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private pessoaSvc:PessoaService,
    private authSvc:AuthService,
    private formBuilder: FormBuilder
  ){
  }

  ngOnInit() {
    this.authSvc.handShake()
    PessoaService.currentPessoa = null
    this.loginForm = this.formBuilder.group({
      telefone: this.formBuilder.control('',[Validators.required]),
      senha: this.formBuilder.control('',[Validators.required])
    })
  }

  doLogin(params: PessoaModel){
    this.pessoaSvc.pessoaLogin(params)
  }

}
