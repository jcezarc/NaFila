import { Component, OnInit } from '@angular/core';
import { LojaModel } from '../Loja-model';
import { LojaService } from '../Loja-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-Loja',
  templateUrl: './new-Loja.component.html'
})
export class NewLojaComponent implements OnInit {

  LojaForm: FormGroup

  constructor(
    private LojaSvc: LojaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    this.LojaForm = this.formBuilder.group({
      nome : this.formBuilder.control('',[Validators.required]),
      melhor_hora : this.formBuilder.control('',[Validators.required]),
      // CEP : this.formBuilder.control('',[Validators.required]),
      endereco : this.formBuilder.control('',[Validators.required]),
      logotipo : this.formBuilder.control('',[Validators.required]),
    })

                
  } // ngOnInit()

  setAddress(value: string){
    console.log('*** Endereço =>', value)
    this.LojaForm.get('endereco').setValue(value)
  }

}
