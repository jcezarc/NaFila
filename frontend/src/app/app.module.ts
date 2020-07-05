import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { LojaComponent } from './Loja/Loja-component';
import { LojaItemComponent } from './Loja/Loja-item/Loja-item.component';
import { LojaService } from './Loja/Loja-service';
import { LojaListComponent } from './Loja/Loja-list/Loja-list.component';
import { NewLojaComponent } from './Loja/new-Loja/new-Loja.component';
import { PessoaComponent } from './Pessoa/Pessoa-component';
import { PessoaItemComponent } from './Pessoa/Pessoa-item/Pessoa-item.component';
import { PessoaService } from './Pessoa/Pessoa-service';
import { PessoaListComponent } from './Pessoa/Pessoa-list/Pessoa-list.component';
import { NewPessoaComponent } from './Pessoa/new-Pessoa/new-Pessoa.component';
import { FilaComponent } from './Fila/Fila-component';
import { FilaItemComponent } from './Fila/Fila-item/Fila-item.component';
import { FilaService } from './Fila/Fila-service';
import { FilaListComponent } from './Fila/Fila-list/Fila-list.component';
import { NewFilaComponent } from './Fila/new-Fila/new-Fila.component';
import {LoginComponent} from './login/login.component'
import { NavigatorComponent } from './shared/navigator/navigator.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { DeleteButtonComponent } from './shared/delete-button/delete-button.component';
import { HeaderComponent } from './header/header.component'
import {ZipCodeService} from './ZipCode/ZipCode-service'
import { ZipCodeComponent } from './ZipCode/ZipCode-component'
import { AuthService } from './login/auth-service'
import { LoginGuard } from './login/login.guard'

@NgModule({
  declarations: [
    AppComponent,
    LojaComponent,
    LojaItemComponent,
    LojaListComponent,
    NewLojaComponent,
    PessoaComponent,
    PessoaItemComponent,
    PessoaListComponent,
    NewPessoaComponent,
    FilaComponent,
    FilaItemComponent,
    FilaListComponent,
    NewFilaComponent,
    LoginComponent,
    HeaderComponent,
    SearchBarComponent,
    NavigatorComponent,
    DeleteButtonComponent,
    ZipCodeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    LojaService,
    PessoaService,
    FilaService,
    ZipCodeService,
    AuthService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
