import { Component, OnInit } from '@angular/core';
import { PessoaImageModel } from '../Pessoa-model';
import { PessoaService } from '../Pessoa-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-Pessoa',
  templateUrl: './new-Pessoa.component.html'
})
export class NewPessoaComponent implements OnInit {

  PessoaForm: FormGroup
  selectedImage: string
  images: PessoaImageModel[] = [
    {name: 'foto_fem_0', path: 'assets/img/pessoas/foto_fem_0.png'},
    {name: 'foto_fem_1', path: 'assets/img/pessoas/foto_fem_1.png'},
    {name: 'foto_fem_2', path: 'assets/img/pessoas/foto_fem_2.png'},
    {name: 'foto_fem_3', path: 'assets/img/pessoas/foto_fem_3.png'},
    {name: 'foto_fem_4', path: 'assets/img/pessoas/foto_fem_4.png'},
    {name: 'foto_fem_5', path: 'assets/img/pessoas/foto_fem_5.png'},
    {name: 'foto_masc_0', path: 'assets/img/pessoas/foto_masc_0.png'},
    {name: 'foto_masc_1', path: 'assets/img/pessoas/foto_masc_1.png'},
    {name: 'foto_masc_2', path: 'assets/img/pessoas/foto_masc_2.png'},
    {name: 'foto_masc_3', path: 'assets/img/pessoas/foto_masc_3.png'},
    {name: 'foto_masc_4', path: 'assets/img/pessoas/foto_masc_4.png'},
  ]

  constructor(
    private PessoaSvc: PessoaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.onSameUrlNavigation = "reload"
    this.PessoaForm = this.formBuilder.group({
      nome : this.formBuilder.control('',[Validators.required]),
      tipo : this.formBuilder.control('',[Validators.required]),
      telefone : this.formBuilder.control('',[Validators.required]),
      // CEP : this.formBuilder.control('',[Validators.required]),
      endereco : this.formBuilder.control('',[Validators.required]),
      foto : this.formBuilder.control('',[Validators.required]),
      senha: this.formBuilder.control('',[Validators.required])
    })
  }

  setImage(image: string){
    PessoaService.selectedImage = image
    this.selectedImage = image
  }

  tiposPessoa():string[]{
    return PessoaService.tipos()
  }

  setAddress(value: string){
    this.PessoaForm.get('endereco').setValue(value)
  }

}
