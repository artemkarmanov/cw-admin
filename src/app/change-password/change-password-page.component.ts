import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {checkPasswords} from '../core/utils';
import {mapTo, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {ChangePasswordService} from './change-password.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

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
    private change$$: Subject<void> = new Subject<void>();
    private isTokenValid$$: Subject<boolean> = new Subject();
    public isTokenValid$: Observable<boolean> = this.isTokenValid$$.asObservable();

    public form: FormGroup = new FormGroup({
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    }, {
        validators: checkPasswords()
    })

    constructor(
        private changePasswordService: ChangePasswordService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.change$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable())
        ).subscribe();
        this.route.queryParamMap.pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap((params) => {
                return this.changePasswordService.checkResetPassword$(
                    params.get('email') as string,
                    params.get('token') as string
                )
            }),
            mapTo(true),
            catchError(e => {
                console.warn(e);
                return of(false)
            }),
            tap(this.isTokenValid$$.next.bind(this)),
        ).subscribe();

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    change(): void {
        this.change$$.next();
    }
}
