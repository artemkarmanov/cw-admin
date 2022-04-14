import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {from, Observable, of, switchMap} from "rxjs";
import {CheckResetPasswordResponse} from "@store/websocket.response.actions";

@Injectable()
export class ChangePasswordGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store,
        private actions: Actions
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        const email = route.queryParamMap.get('email')
        const passwordChangeToken = route.queryParamMap.get('passwordChangeToken')
        return this.store.dispatch(new Send({
            type: MessageType.CheckResetPassword,
            data: {email, passwordChangeToken}
        }))
            .pipe(
                switchMap(() => this.actions.pipe(ofActionSuccessful(CheckResetPasswordResponse))),
                switchMap(({code}) => code === 200 ? of(true) : from(this.router.navigate(['/'])))
            )
    }
}
