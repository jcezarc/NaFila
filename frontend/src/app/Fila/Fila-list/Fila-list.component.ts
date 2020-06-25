import { Component, OnInit } from '@angular/core';
import { FilaModel } from '../Fila-model';
import { FilaService } from '../Fila-service';
import { Router } from '@angular/router';
import {RespJsonFlask} from '../../app.api'
import {PessoaService} from '../../Pessoa/Pessoa-service'
import {LojaService} from '../../Loja/Loja-service'

@Component({
  selector: 'app-Fila-list',
  templateUrl: './Fila-list.component.html'
})
export class FilaListComponent implements OnInit {

  items: FilaModel[]
  
  constructor(
    private FilaSvc: FilaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    this.FilaSvc.allFilas().subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<FilaModel[]>obj.data)
        if(!this.items) this.items = []
      }
    )
  }

  filter(param: any){
    this.FilaSvc.filasById(param.searchContent).subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<FilaModel[]>obj.data)
      }
    )
  }

  add(){
    this.router.navigate(['/new-Fila'])
  }

  remove(item: FilaModel){
    if(!confirm(`Remove Fila "${item.fila_id}" ?`)){
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
