import { Component, OnInit } from '@angular/core';
import {RespJsonFlask} from '../../app.api'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LojaService} from '../../Loja/Loja-service'
import {LojaModel} from '../../Loja/Loja-model'
import {PessoaService} from '../../Pessoa/Pessoa-service'
import {FilaService} from '../../Fila/Fila-service'
import { FilaModel } from '../Fila-model';
import { PessoaModel } from 'src/app/Pessoa/Pessoa-model';


@Component({
  selector: 'app-new-Fila',
  templateUrl: './new-Fila.component.html'
})
export class NewFilaComponent implements OnInit {

  FilaForm: FormGroup
  lojas: LojaModel[]
  pessoaAtual: string

  constructor(
    private LojaSvc: LojaService,
    private FilaSvc: FilaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
      this.router.onSameUrlNavigation = "reload"
      this.pessoaAtual = PessoaService.currentPessoa.nome
      // --- Form Builder -------------------------------------------
      this.FilaForm = this.formBuilder.group({
        pessoa : this.formBuilder.control(
          PessoaService.currentPessoa.nome,
          [Validators.required]
        ),
        posicao : this.formBuilder.control('1'),
        observacao : this.formBuilder.control(''),
        loja : this.formBuilder.control('', [Validators.required]),
      })
      // ---- Loja List -----------------------------------------------
      this.LojaSvc.lojasByCEP().subscribe(
          resp => {
            let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
            this.lojas = (<LojaModel[]>obj.data)
          }
        )
      // ---- <Select> change event ------------------------------------
      this.FilaForm.get('loja').valueChanges.subscribe(
        newValue => this.setLoja(newValue)
      )
    }

    setLoja(search: number){
      let found:LojaModel = null
      for (let i = 0; i < this.lojas.length; i++) {
        const element = this.lojas[i];
        if (element.loja_id == search){
          found = element
          break
        }
      }
      if(!found) {
        return
      }
      LojaService.currentLoja = found
      this.FilaSvc.filaByLoja(found.loja_id).subscribe(
        resp => {
          let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
          let lastFilas:FilaModel[] = (<FilaModel[]>obj.data)
          if(this.alreadyExists(lastFilas)){
            alert('Você já está na fila dessa loja!')
            this.FilaForm.get('loja').setValue('')
            return
          }
          this.setPosicao(lastFilas)
        }
      )
    }

    alreadyExists(filas:FilaModel[]):Boolean{
      let search:number = PessoaService.currentPessoa.pessoa_id
      for (let i = 0; i < filas.length; i++) {
        const element = filas[i];
        if(element.pessoa.pessoa_id == search) return true
      }
      return false
    }

    setPosicao(filas:FilaModel[]){
      let novaPosicao = 1
      if(filas){
        novaPosicao = filas.length + 1
      }
      this.FilaForm.get('posicao').setValue(novaPosicao)
    }

    isAdmin():Boolean{
      return PessoaService.isAdmin()
    }

    fotoPessoa():string{
      return PessoaService.currentPessoa.foto
    }

}
