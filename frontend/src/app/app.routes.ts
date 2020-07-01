import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LojaComponent } from "./Loja/Loja-component";
import { NewLojaComponent } from "./Loja/new-Loja/new-Loja.component";
import { PessoaComponent } from "./Pessoa/Pessoa-component";
import { NewPessoaComponent } from "./Pessoa/new-Pessoa/new-Pessoa.component";
import { FilaComponent } from "./Fila/Fila-component";
import { NewFilaComponent } from "./Fila/new-Fila/new-Fila.component";
import { LoginGuard } from "./login/login.guard";

export const ROUTES:Routes = [
    {path:'',component:LoginComponent},
    {path:'Loja',component:LojaComponent,canActivate: [LoginGuard]},
    {path:'Loja/:title',component:LojaComponent,canActivate: [LoginGuard]},
    {path:'new-Loja',component:NewLojaComponent,canActivate: [LoginGuard]},
    {path:'Pessoa',component:PessoaComponent,canActivate: [LoginGuard]},
    {path:'Pessoa/:name',component:PessoaComponent,canActivate: [LoginGuard]},
    {path:'new-Pessoa',component:NewPessoaComponent
    // ,canActivate: [LoginGuard]
    },
    {path:'Fila',component:FilaComponent
    // ,canActivate: [LoginGuard]
    },
    {path:'new-Fila',component:NewFilaComponent,canActivate: [LoginGuard]},
]