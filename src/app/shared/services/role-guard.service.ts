 import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Enum } from '../config/enum.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let roles = route.data["roles"] as Array<any>;
    if (!roles) {
      roles = [Enum.ADMIN];
    }
    if (this.authService.isRoleExists(roles)) {
      return Promise.resolve(true);
    }
    else {
      this.router.navigate(['/dashboard']);
      return Promise.resolve(false);
    }
  }
}
