import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateService} from '../create.service';
import {merge, Observable, Subject, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UsersService} from "../../../../core/users.service";
import {IUser} from "../../../../core/types";

@Component({
    selector: 'cwb-general-booking-information',
    templateUrl: './general-booking-information.component.html',
    styleUrls: ['./general-booking-information.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralBookingInformationComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject();
    public users$: Observable<IUser[]> = this.usersService.getUsers$()

    public form: FormGroup = new FormGroup({
        title: new FormControl(this.createService.title, [Validators.required, Validators.maxLength(100)/*, Validators.minLength(10)*/]),
        startDate: new FormControl(this.createService.startDate, [Validators.required]),
        startTime: new FormControl(this.createService.startTime, [Validators.required]),
        duration: new FormControl(this.createService.durationMins, [Validators.required]),
        timeZoneOverride: new FormControl(this.createService.timeZone, []),
        countWeeks: new FormControl(this.createService.countWeeks, [Validators.required, Validators.min(1)]),
        oboUserId: new FormControl(this.createService.oboUserId, [])
    });

    constructor(
      private createService: CreateService,
      private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        setTimeout(() => this.createService.currentStepFormIsValid(this.form.valid), 0);

        merge(
            (this.form.get('title') as FormControl).valueChanges.pipe(
                tap((title) => {
                    this.createService.title = title;
                })
            ),
            (this.form.get('startDate') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.startDate = value;
                })
            ),
            (this.form.get('startTime') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.startTime = value;
                })
            ),
            (this.form.get('duration') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.durationMins = value;
                })
            ),
            (this.form.get('countWeeks') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.countWeeks = value;
                })
            ),
            (this.form.get('oboUserId') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.oboUserId = value
                })
            ),
            (this.form.get('timeZoneOverride') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.timeZone = value;
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
