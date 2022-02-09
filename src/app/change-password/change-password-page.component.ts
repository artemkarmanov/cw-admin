import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {checkPasswords} from '../core/utils';
import {Subject, takeUntil} from 'rxjs';
import {ChangePasswordService} from './change-password.service';

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

    public form: FormGroup = new FormGroup({
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    }, {
        validators: checkPasswords()
    })

    constructor() {
    }

    ngOnInit(): void {
        this.change$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable())
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    change(): void {
        this.change$$.next();
    }
}
