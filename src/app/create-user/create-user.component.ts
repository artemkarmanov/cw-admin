import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {CreateUserService} from './create-user.service';
import {from, Subject, switchMap, takeUntil} from 'rxjs';
import {Router} from '@angular/router';


export function checkPasswords(): ValidatorFn {
    return (_: AbstractControl): ValidationErrors | null => {
        const form: FormGroup = _ as FormGroup;
        if (form.get('password')?.value === form.get('password2')?.value) return null;
        return {
            passwordsDiffers: true
        }
    };
}

@Component({
    selector: 'cwb-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CreateUserService
    ]
})
export class CreateUserComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private create$$: Subject<void> = new Subject<void>();
    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
    }, {
        validators: checkPasswords()
    })

    constructor(
        private createUserService: CreateUserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.create$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => {
                return this.createUserService.create$(
                    this.form.get('email')?.value,
                    this.form.get('password')?.value
                );
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
