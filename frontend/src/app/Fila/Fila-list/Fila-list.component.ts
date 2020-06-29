import { Component, OnInit, ɵɵelementContainerStart, ɵSWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core';
import { FilaModel } from '../Fila-model';
import { FilaService } from '../Fila-service';
import { Router } from '@angular/router';
import {RespJsonFlask} from '../../app.api'
import {PessoaService} from '../../Pessoa/Pessoa-service'
import {LojaService} from '../../Loja/Loja-service'
import { PessoaModel } from 'src/app/Pessoa/Pessoa-model';
import { LojaModel } from 'src/app/Loja/Loja-model';

@Component({
  selector: 'app-Fila-list',
  templateUrl: './Fila-list.component.html'
})
export class FilaListComponent implements OnInit {

  source: FilaModel[]
  items: FilaModel[] = []
  
  constructor(
    private FilaSvc: FilaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    this.FilaSvc.allFilas().subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.source = (<FilaModel[]>obj.data)
        this.items = []
        if(this.source) this.items = this.source
      }
    )
  }

  similar(str1, str2: string):Boolean{
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()
    return str1.includes(str2)
  }

  filter(param: any){
    this.items = []
    const search = param.searchContent
    const byPessoa:Boolean = PessoaService.isAdmin()
    for (let i = 0; i < this.source.length; i++) {
      const element = this.source[i];
      let match:Boolean = false
      if(byPessoa){
        let pessoa:PessoaModel = (<PessoaModel>element.pessoa)
        match = this.similar(pessoa.nome, search)
      }
      if(!match){
        let loja:LojaModel = (<LojaModel>element.loja)
        match = this.similar(loja.nome, search)
      }
      if(match){
        this.items.push(element)
      }
    }
  }

  add(){
    this.router.navigate(['/new-Fila'])
  }

  remove(item: FilaModel){
    if(!confirm(`Remover Fila "${item.fila_id}" ?`)){
      return
    }
    this.FilaSvc.delete(item.fila_id as unknown as string)
    this.items.splice(this.items.indexOf(item),1)
  }

  save(item: FilaModel){
    item.pessoa = PessoaService.currentPessoa
    item.loja = LojaService.currentLoja
    console.log('*** Salvando Fila =>', item)
    this.FilaSvc.saveFila(item)
    this.items.push(item)
  }

  select(item: FilaModel){
    FilaService.currentFila = item
    this.router.navigate(['/new-'])
  }

}
