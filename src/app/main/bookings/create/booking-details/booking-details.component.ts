import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {merge, Subject, takeUntil} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {CreateService} from '../create.service';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'cwb-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingDetailsComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public form: FormGroup = new FormGroup({
        requirePasscode: new FormControl(this.createService.requirePasscode),
        requireLogin: new FormControl(this.createService.requireLogin),
        viewerEmails: new FormControl(this.createService.viewerEmails)
    });

    constructor(private createService: CreateService) {
    }

    ngOnInit(): void {
        this.createService.currentStepFormIsValid(this.form.valid);
        merge(
            (this.form.get('requirePasscode') as FormControl).valueChanges.pipe(
                tap(value => {
                    this.createService.requirePasscode = value;
                })
            ),
            (this.form.get('requireLogin') as FormControl).valueChanges.pipe(
                tap(value => {
                    this.createService.requireLogin = value;
                })
            ),
            (this.form.get('viewerEmails') as FormControl).valueChanges.pipe(
                tap(value => {
                    this.createService.viewerEmails = value;
                })
            ),
        ).pipe(
            takeUntil(this.destroy$$.asObservable()),
        ).subscribe();
        this.form.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap(() => {
                this.createService.currentStepFormIsValid(this.form.valid);
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
