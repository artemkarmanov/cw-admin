import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mapTo, Observable, of, Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {ChangePasswordService} from './change-password.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '@services/auth.service';
import {checkPasswords} from "@helpers/check-passwords";

@Component({
    selector: 'cwb-change-password',
    templateUrl: './change-password-page.component.html',
    styleUrls: ['./change-password-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ChangePasswordService
    ]
})
export class ChangePasswordPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private change$$: Subject<string> = new Subject<string>();
    private isTokenValid$$: Subject<boolean> = new Subject();
    public isTokenValid$: Observable<boolean> = this.isTokenValid$$.asObservable().pipe(
    );
    public isAuthorized: Observable<boolean> = this.auth.isAuthorized$;

    public form: FormGroup = new FormGroup({
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    }, {
        validators: checkPasswords()
    })

    constructor(
        private changePasswordService: ChangePasswordService,
        private route: ActivatedRoute,
        private auth: AuthService
    ) {
    }

    ngOnInit(): void {

        this.change$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            withLatestFrom(this.route.queryParamMap),
            switchMap(([password, params]) => {
                const email = atob(params.get('email') as string);
                const token = params.get('token') as string;
                return this.changePasswordService.changePassword$(email, token, password);
            })
        ).subscribe();
        this.route.queryParamMap.pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap((params) => {
                return this.changePasswordService.checkResetPassword$(
                    atob(params.get('email') as string),
                    params.get('token') as string
                )
            }),
            mapTo(true),
            catchError(e => {
                console.warn(e);
                return of(false)
            }),
            tap(this.isTokenValid$$.next.bind(this.isTokenValid$$)),
        ).subscribe();

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    change(): void {
        if (this.form.valid) {
            this.change$$.next(this.form.get('password')?.value);
        }
    }
}
