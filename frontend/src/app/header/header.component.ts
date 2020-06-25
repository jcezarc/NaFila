import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../Pessoa/Pessoa-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  enabledLinks():Boolean{
    return PessoaService.isAdmin()
  }

}
