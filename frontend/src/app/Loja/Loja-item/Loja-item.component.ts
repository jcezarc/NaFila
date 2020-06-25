import { Component, OnInit, Input } from '@angular/core';
import { LojaModel } from '../Loja-model';

@Component({
  selector: 'app-Loja-item',
  templateUrl: './Loja-item.component.html',
  styleUrls: ['./Loja-item.component.css']
})
export class LojaItemComponent implements OnInit {

  @Input() Loja: LojaModel

  constructor() { }

  ngOnInit() {
  }

}
