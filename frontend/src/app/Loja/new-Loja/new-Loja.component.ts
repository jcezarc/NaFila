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
      endereco : this.formBuilder.control('',[Validators.required]),
      logotipo : this.formBuilder.control('',[Validators.required]),
      // ---- Atendimento Preferencial da Loja -----
      atend_especial: this.formBuilder.group({
          NaoPreferencial: this.formBuilder.control(true),
          Admin: this.formBuilder.control(true),
          GravidaIdoso: this.formBuilder.control(true),
          Deficiente: this.formBuilder.control(true),
      })
      // -------------------------------------------
    })

                
  } // ngOnInit()

}
