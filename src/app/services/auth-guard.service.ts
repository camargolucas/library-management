
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  getUserStorage(): boolean {
    try {
      const user = localStorage.getItem('user')
      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error)
      this.router.navigate([`/login`], { replaceUrl: true });
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.getUserStorage()){   
      return true
    }else{
      this.router.navigate([`/login`], { replaceUrl: true });
      return false
    }    
  }

}
