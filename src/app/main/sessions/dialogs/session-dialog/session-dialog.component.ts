import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MINIMUM_SESSION_DURATION, DEFAULT_SESSION_DURATION} from '@constants/const';
import {DateTime} from 'luxon';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {environment} from '@env';
import {ISession} from "@interfaces/session.interfaces";
import {DialogRef} from "@services/dialog.service";

interface IFormData {
    startDate: string;
    startTime: string;
    sessionDurationMins: string;
    audioDetailsOverride?: string;
    captionDispOverride?: string;
    nonBilled?: boolean;
    respeakerRateOverride?: string;
    allowOverrun: boolean;
}

@Component({
    selector: 'cwb-session-dialog',
    templateUrl: './session-dialog.component.html',
    styleUrls: ['./session-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionDialogComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public isAdmin = environment.role === 'admin';
    public inEditMode = false;
    public data$$: BehaviorSubject<ISession | null> = new BehaviorSubject<ISession | null>(null);
    private data$: Observable<ISession> = this.data$$.asObservable().pipe(
        filter(Boolean)
    );

    public form!: FormGroup;

    constructor(private modal: DialogRef) {
        const controls = {
            startDate: new FormControl(new Date(), Validators.required),
            startTime: new FormControl('', Validators.required),
            sessionDurationMins: new FormControl(DEFAULT_SESSION_DURATION, [Validators.required, Validators.min(MINIMUM_SESSION_DURATION)]),
            audioDetailsOverride: new FormControl({value: '', disabled: true }),
            captionDispOverride: new FormControl({value: '', disabled: true }),
            allowOverrun: new FormControl(false)
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
                this.inEditMode = true;
                
                const ISOTimeA = DateTime.fromSeconds(session.startEpoch).toISOTime().split(':');
                const startTime = {hour: +ISOTimeA[0], minute: +ISOTimeA[1], second: 0};
                const startDate = DateTime.fromSeconds(session.startEpoch).toISODate();
                
                this.form.get('startDate')?.setValue(startDate);
                this.form.get('startTime')?.setValue(startTime);
                this.form.get('sessionDurationMins')?.setValue(session.sessionDurationMins);
                this.form.get('audioDetailsOverride')?.setValue(session.audioDetailsOverride);
                this.form.get('captionDispOverride')?.setValue(session.captionDispOverride);
                this.form.get('nonBilled')?.setValue(session.nonBilled);
                this.form.get('respeakerRateOverride')?.setValue(session.respeakerRateOverride);
                this.form.get('allowOverrun')?.setValue(session.allowOverrun ? 1 : 0);
            })
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    save() {
        if (this.form.valid) {
            const {
                startDate,
                sessionDurationMins,
                audioDetailsOverride,
                captionDispOverride,
                respeakerRateOverride,
                nonBilled,
                allowOverrun
            } = this.form.value as IFormData;

            const transformedValue = ('0' + new Date().getHours()).slice(-2) + ':' + new Date().getMinutes();
            const startEpoch = DateTime.fromISO([startDate, transformedValue].join('T')).toSeconds();

            this.modal.close({
                startEpoch,
                SetRespeakerRateOverride: 1,
                sessionDurationMins: parseInt(sessionDurationMins),
                ...(audioDetailsOverride && {audioDetailsOverride}),
                ...(captionDispOverride && {captionDispOverride}),
                ...((respeakerRateOverride && parseFloat(respeakerRateOverride)) && {respeakerRateOverride: parseFloat(respeakerRateOverride)}),
                ...(nonBilled !== undefined && {nonBilled: nonBilled ? 1 : 0}),
                ...(allowOverrun !== undefined && {allowOverrun: allowOverrun ? 1 : 0})
            });
        }

    }

    close() {
        this.modal.close();
    }

    updateAudioAttribute(checked: boolean): void {
        checked ? this.form.controls['audioDetailsOverride'].disable() :
            this.form.controls['audioDetailsOverride'].enable();
    }

    updateCaptionAttribute(checked: boolean): void {
        checked ? this.form.controls['captionDispOverride'].disable() :
            this.form.controls['captionDispOverride'].enable();
    }

}
