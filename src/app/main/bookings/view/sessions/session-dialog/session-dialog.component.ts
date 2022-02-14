import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MINIMUM_SESSION_DURATION} from '../../../../../core/const';
import {DateTime} from 'luxon';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {ISession} from '../../../../../core/types';
import {filter, tap} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';

interface IFormData {
    startDate: string;
    startTime: string;
    sessionDurationMins: string;
    audioDetailsOverride?: string;
    captionDispOverride?: string;
    nonBilled?: boolean;
    respeakerRateOverride?: string;
}

@Component({
    selector: 'cwb-session-dialog',
    templateUrl: './session-dialog.component.html',
    styleUrls: ['./session-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDialogComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public isAdmin = environment.role === 'admin';
    public data$$: BehaviorSubject<ISession | null> = new BehaviorSubject<ISession | null>(null);
    private data$: Observable<ISession> = this.data$$.asObservable().pipe(
        filter(Boolean)
    );

    public form!: FormGroup;

    constructor(private modal: NgbActiveModal) {
        const controls = {
            startDate: new FormControl('', Validators.required),
            startTime: new FormControl('', Validators.required),
            sessionDurationMins: new FormControl(MINIMUM_SESSION_DURATION, [Validators.required, Validators.min(MINIMUM_SESSION_DURATION)]),
            audioDetailsOverride: new FormControl(''),
            captionDispOverride: new FormControl(''),
        };
        if (this.isAdmin) {
            Object.assign(controls, {
                nonBilled: new FormControl(''),
                respeakerRateOverride: new FormControl('')
            })
        }
        this.form = new FormGroup(controls);
    }

    ngOnInit(): void {
        this.data$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((session: ISession) => {
                const d = DateTime.fromMillis(session.startEpoch, {
                    zone: 'utc'
                });
                const startDate = d.toISODate();
                const startTime = d.toISOTime({
                    includeOffset: false,
                    suppressMilliseconds: true
                });
                this.form.get('startDate')?.setValue(startDate);
                this.form.get('startTime')?.setValue(startTime);
                this.form.get('sessionDurationMins')?.setValue(session.sessionDurationMins);

                this.form.get('audioDetailsOverride')?.setValue(session.audioDetailsOverride);
                this.form.get('captionDispOverride')?.setValue(session.captionDispOverride);
                this.form.get('nonBilled')?.setValue(session.nonBilled);
                this.form.get('respeakerRateOverride')?.setValue(session.respeakerRateOverride);
            })
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    save() {
        if (this.form.valid) {
            const {
                startTime,
                startDate,
                sessionDurationMins,
                audioDetailsOverride,
                captionDispOverride,
                respeakerRateOverride,
                nonBilled
            } = this.form.value as IFormData;

            const startEpoch = DateTime.fromISO([startDate, startTime].join('T')).toMillis();

            this.modal.close({
                startEpoch,
                sessionDurationMins: parseInt(sessionDurationMins),
                ...(audioDetailsOverride && {audioDetailsOverride}),
                ...(captionDispOverride && {captionDispOverride}),
                ...((respeakerRateOverride && parseFloat(respeakerRateOverride)) && {respeakerRateOverride: parseFloat(respeakerRateOverride)}),
                ...(nonBilled !== undefined && {nonBilled: nonBilled ? 1 : 0})
            });
        }

    }

    close() {
        this.modal.dismiss();
    }

}
