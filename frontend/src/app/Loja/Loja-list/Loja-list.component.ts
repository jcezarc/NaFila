import { Component, OnInit } from '@angular/core';
import { LojaModel } from '../Loja-model';
import { LojaService } from '../Loja-service';
import { Router, ActivatedRoute } from '@angular/router';
import {RespJsonFlask} from '../../app.api'
import { Response } from "@angular/http";
import { Observable } from "../../../../node_modules/rxjs";
import {PessoaService} from '../../Pessoa/Pessoa-service'

@Component({
  selector: 'app-Loja-list',
  templateUrl: './Loja-list.component.html'
})
export class LojaListComponent implements OnInit {

  items: LojaModel[] = []
  
  constructor(
    private LojaSvc: LojaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.paramMap.get('title');
    let func: Observable<Response>
    if(param){
      func = this.LojaSvc.lojasByNome(param)
    }else{
      func = this.LojaSvc.allLojas()
    }
    this.router.onSameUrlNavigation = "reload"
    func.subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<LojaModel[]>obj.data)
      }
    )
  }

  filter(param: any){
    this.LojaSvc.lojasByNome(param.searchContent).subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<LojaModel[]>obj.data)
      }
    )
  }

  add(){
    this.router.navigate(['/new-Loja'])
  }

  remove(item: LojaModel){
    if(!confirm(`Remove Loja "${item.nome}" ?`)){
      return
    }
    this.LojaSvc.delete(item.loja_id as unknown as number)
    this.items.splice(this.items.indexOf(item),1)
  }

  save(item: LojaModel){
    const names = PessoaService.tipos(false)
    let Result = []
    names.map(name => {if(item.atend_especial[name]) Result.push(name)})
    item.atend_especial = Result.join()
    this.LojaSvc.saveLoja(item)
    this.items.push(item)
  }

}
