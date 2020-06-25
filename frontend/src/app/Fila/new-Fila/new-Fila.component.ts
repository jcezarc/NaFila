import { Component, OnInit } from '@angular/core';
import {RespJsonFlask} from '../../app.api'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LojaService} from '../../Loja/Loja-service'
import {LojaModel} from '../../Loja/Loja-model'
import {PessoaService} from '../../Pessoa/Pessoa-service'


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
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
      this.router.onSameUrlNavigation = "reload"
      this.pessoaAtual = PessoaService.currentPessoa.nome
      // --- Form Builder -------------------------------------------
      this.FilaForm = this.formBuilder.group({
        posicao : this.formBuilder.control('1',[Validators.required]),
        avaliacao : this.formBuilder.control('',[Validators.required]),
        loja : this.formBuilder.control('', [Validators.required]),
      })
      // ---- Loja List -----------------------------------------------
      this.LojaSvc.lojasByAtendEspec().subscribe(
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
      let Result = `${PessoaService.currentPessoa.pessoa_id}_${found.loja_id}`
      this.FilaForm.get('fila_id').setValue(Result)
    }

    isAdmin():Boolean{
      return PessoaService.isAdmin()
    }

}
