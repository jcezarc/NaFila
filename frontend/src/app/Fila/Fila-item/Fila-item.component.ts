import { Component, OnInit, Input } from '@angular/core';
import { FilaModel } from '../Fila-model';
import {PessoaService} from '../../Pessoa/Pessoa-service'

@Component({
  selector: 'app-Fila-item',
  templateUrl: './Fila-item.component.html',
  styleUrls: ['./Fila-item.component.css']
})
export class FilaItemComponent implements OnInit {

  @Input() Fila: FilaModel


  constructor() { }

  ngOnInit() {
  }

  isAdmin():Boolean{
    return PessoaService.isAdmin()
  }

  }
