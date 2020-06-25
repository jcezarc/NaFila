import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { PessoaService } from "../Pessoa/Pessoa-service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        var Result: boolean
        if(route.routeConfig.path == "new-Fila"){
            Result = true
        }else{
            Result = (PessoaService.isAdmin())
        }
        if(!Result) this.router.navigate([''])
        
        return Result
    }
}
