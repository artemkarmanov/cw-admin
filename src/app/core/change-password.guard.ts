import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';

@Injectable()
export class ChangePasswordGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        const result = route.queryParamMap.has('token') && route.queryParamMap.has('userId');
        return result || this.router.createUrlTree(['/']);
    }

}
