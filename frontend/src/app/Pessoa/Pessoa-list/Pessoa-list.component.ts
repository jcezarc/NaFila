import { Component, OnInit } from '@angular/core';
import { PessoaModel } from '../Pessoa-model';
import { PessoaService } from '../Pessoa-service';
import { Router,ActivatedRoute } from '@angular/router';
import {RespJsonFlask} from '../../app.api'
import { Response } from "@angular/http";
import { Observable } from "../../../../node_modules/rxjs";


@Component({
  selector: 'app-Pessoa-list',
  templateUrl: './Pessoa-list.component.html'
})
export class PessoaListComponent implements OnInit {

  items: PessoaModel[] = []
  
  constructor(
    private PessoaSvc: PessoaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    const param = this.activatedRoute.snapshot.paramMap.get('name');
    let func: Observable<Response>
    if(param){
      func = this.PessoaSvc.pessoasByName(param)
    }else{
      func = this.PessoaSvc.allPessoas()
    }
    func.subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<PessoaModel[]>obj.data)
      }
    )
  }

  filter(param: any){
    this.PessoaSvc.pessoasByName(param.searchContent).subscribe(
      resp => {
        let obj:RespJsonFlask = (<RespJsonFlask>resp.json())
        this.items = (<PessoaModel[]>obj.data)
      // },error => {
      //   if(error.status == 404) this.items = []
      }
    )
  }

  add(){
    this.router.navigate(['/new-Pessoa'])
  }

  remove(item: PessoaModel){
    if(!confirm(`Remove Pessoa "${item.nome}" ?`)){
      return
    }
    this.PessoaSvc.delete(item.pessoa_id as unknown as number)
    this.items.splice(this.items.indexOf(item),1)
  }

  save(item: PessoaModel){
    item.foto = PessoaService.selectedImage
    this.PessoaSvc.savePessoa(item)
    this.items.push(item)
  }

  select(item: PessoaModel){
    PessoaService.currentPessoa = item
    this.router.navigate(['/new-Fila'])
  }

}
