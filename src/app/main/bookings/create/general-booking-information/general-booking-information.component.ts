import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateService} from '../create.service';
import {merge, Observable, Subject, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UsersService} from "@services/users.service";
import {NgbTimepickerConfig, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {IUser} from "@interfaces/user.interfaces";
import {environment} from '@env';

@Component({
    selector: 'cwb-general-booking-information',
    templateUrl: './general-booking-information.component.html',
    styleUrls: ['./general-booking-information.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NgbTimepickerConfig]
})
export class GeneralBookingInformationComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject();
    public users$: Observable<IUser[]> = this.userService.getUsers$()

    public form: FormGroup = new FormGroup({
        title: new FormControl(this.createService.title, [Validators.required, Validators.maxLength(100)/*, Validators.minLength(10)*/]),
        startDate: new FormControl(this.createService.startDate, [Validators.required]),
        startTime: new FormControl(this.createService.startTime, [Validators.required]),
        duration: new FormControl(this.createService.durationMins, [Validators.required, Validators.min(15)]),
        timeZoneOverride: new FormControl(this.createService.timeZone, []),
        countWeeks: new FormControl(this.createService.countWeeks, [Validators.required, Validators.min(1)]),
        oboUserId: new FormControl(this.createService.oboUserId, []),
        allowOverrun: new FormControl(this.createService.overrunCaptioning)
    });

    public time: NgbTimeStruct = {hour: 13, minute: 30, second: 0}
    public meridian = true;
    public isAdmin = environment.role === 'admin';


    constructor(
        private createService: CreateService,
        private userService: UsersService,
        public config: NgbTimepickerConfig) {
        // customize default values of ratings used by this component tree
        config.seconds = false;
        config.spinners = false;
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
                    // The new time picker sends data in a different way
                    // than the original time picker, so this transformation
                    // is necessary.  We need to send time data as hh:mm 
                    // So that's why we use this .slice statment (to append a zero
                    // to the front in case it needs one)
                    let transformedValue = ("0" + value.hour).slice(-2) + ":" + value.minute
                    console.log(transformedValue)
                    this.createService.startTime = transformedValue;
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
            (this.form.get('allowOverrun') as FormControl).valueChanges.pipe(
                tap((value) => {
                    this.createService.overrunCaptioning = value;
                })
            )
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

    plus() {
        
        let currentVal = this.form.get("countWeeks")?.value
        if (currentVal < 100) {
            let nextVal = currentVal + 1
            this.form.get("countWeeks")?.setValue(nextVal)
        }
        
    }

    minus() {
        let currentVal = this.form.get("countWeeks")?.value
        if (currentVal >= 2) {
            let nextVal = currentVal - 1
            this.form.get("countWeeks")?.setValue(nextVal)
        }
    }


}
