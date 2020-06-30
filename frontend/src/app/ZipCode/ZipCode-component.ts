import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ZipCodeService } from './ZipCode-service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AddressModel, SearchZipModel } from './ZipCode-model'

@Component({
    selector: 'app-zip-code',
    templateUrl: './ZipCode-component.html'
  })
  export class ZipCodeComponent implements OnInit {

    @Input() parentForm: FormGroup
    @Output() send = new EventEmitter()
    zipCodeForm: FormGroup

    constructor(
        private zipCodeSvc: ZipCodeService
    ){}

    ngOnInit(){
        const zipCodeField: FormControl = new FormControl(
            '',[Validators.required]
        )
        this.zipCodeForm = new FormGroup({
            CEP: zipCodeField,
            complemento: new FormControl('', [Validators.required]),
        })
        this.parentForm.addControl('CEP', zipCodeField)
    }

    getFullAddress(address:AddressModel): string{
        let Result: string = address.logradouro
        Result += `, ${address.complemento}`
        Result += ` - ${address.bairro}`
        Result += ` - ${address.localidade}`
        Result += ` - ${address.uf}`
        return Result
    }
   
    findZipCode(param: SearchZipModel){
        this.zipCodeSvc.getAddress(param.CEP).subscribe(
            resp => {
                let obj:AddressModel = (<AddressModel> resp.json())
                if(obj.logradouro == undefined){
                    alert('CEP não encontrado!')
                    return
                }
                obj.complemento = param.complemento
                this.send.emit(
                    this.getFullAddress(obj)
                )                
            }
        )
    }

  }  