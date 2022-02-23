import {Injectable} from '@angular/core';
import {CanLoad, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {getStartPage} from './utils';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad {

    constructor(private router: Router) {
    }

    canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return environment.role === 'admin' || this.router.createUrlTree([getStartPage()]);
    }
}
