import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CreateService} from '../create.service';
import {merge, Subject, takeUntil} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'cwb-in-out-booking-information',
    templateUrl: './in-out-booking-information.component.html',
    styleUrls: ['./in-out-booking-information.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InOutBookingInformationComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public form: FormGroup = new FormGroup({
        audioDetails: new FormControl(this.createService.audioDetails),
        captionDispDetails: new FormControl(this.createService.captionDispDetails)
    });

    constructor(private createService: CreateService) {
    }

    ngOnInit(): void {
        setTimeout(() => this.createService.currentStepFormIsValid(this.form.valid), 0);
        merge(
            (this.form.get('audioDetails') as FormControl).valueChanges.pipe(
                tap(value => {
                    this.createService.audioDetails = value;
                })
            ),
            (this.form.get('captionDispDetails') as FormControl).valueChanges.pipe(
                tap(value => {
                    this.createService.captionDispDetails = value;
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
