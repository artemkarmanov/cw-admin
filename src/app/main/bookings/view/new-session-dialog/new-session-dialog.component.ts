import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MINIMUM_SESSION_DURATION} from '../../../../core/const';
import {DateTime} from 'luxon';

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
    selector: 'cwb-new-session-dialog',
    templateUrl: './new-session-dialog.component.html',
    styleUrls: ['./new-session-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSessionDialogComponent implements OnInit {
    public form: FormGroup = new FormGroup({
        startDate: new FormControl('', Validators.required),
        startTime: new FormControl('', Validators.required),
        sessionDurationMins: new FormControl(MINIMUM_SESSION_DURATION, [Validators.required, Validators.min(MINIMUM_SESSION_DURATION)]),
        audioDetailsOverride: new FormControl(''),
        captionDispOverride: new FormControl(''),
        nonBilled: new FormControl(''),
        respeakerRateOverride: new FormControl('')
    })

    constructor(private modal: NgbActiveModal) {
    }

    ngOnInit(): void {
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
