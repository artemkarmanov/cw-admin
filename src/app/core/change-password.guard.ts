import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {SocketMessagesService} from './socket-messages.service';

@Injectable()
export class ChangePasswordGuard implements CanActivate {

    constructor(private router: Router, private messages: SocketMessagesService) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        const result = route.queryParamMap.has('token') && route.queryParamMap.has('email');
        console.log(route.queryParamMap);
        return (result) || this.router.createUrlTree(['/']);
    }

}
