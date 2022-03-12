import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {from, Subject, switchMap, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {INewUser} from '../core/types';
import {checkPasswords} from '../core/utils';
import {UsersService} from '../core/users.service';
import {tap} from 'rxjs/operators';
import {AuthService} from '../core/auth.service';


@Component({
    selector: 'cwb-create-user',
    templateUrl: './create-user-page.component.html',
    styleUrls: ['./create-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private create$$: Subject<void> = new Subject<void>();
    public form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        timeZone: new FormControl('', [Validators.required]),
    }, {
        validators: checkPasswords()
    })

    constructor(
        private createUserService: UsersService, 
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {  
        this.create$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => {
                const data: INewUser = this.form.value;

                return this.createUserService.create$(
                    data
                );
            }),
             tap(token => {
                this.authService.authorize(token)
             }),
             switchMap(() => {         
                return from(this.router.navigate(['bookings']))
             })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    create(): void {
        if (this.form.valid) {
            this.create$$.next();      
        }
    }

}
