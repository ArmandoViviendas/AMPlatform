import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("tenemos que verficar si estas Logeado");
    console.log(this.authService.isLoggedIn);
    if(this.authService.isLoggedIn !== true) {
      this.router.navigate(['login'])
    }/*else{
      this.router.navigate(['dashboard'])
    }*/
    return true;
  }
 
}
