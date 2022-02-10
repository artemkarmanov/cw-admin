import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ViewService} from '../view.service';
import {Observable, Subject, takeUntil} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {IBooking} from '../../../../core/types';

@Component({
    selector: 'cwb-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private data$$: Subject<IBooking> = new Subject<IBooking>();
    public data$: Observable<IBooking> = this.data$$.asObservable();
    public saveChanges$$: Subject<void> = new Subject<void>();
    public form = new FormGroup({

        title: new FormControl('', Validators.required),
        audioDetails: new FormControl('', Validators.required),
        captionDispDetails: new FormControl('', Validators.required),
        // requirePasscode: new FormControl(''),
        // requireLogin: new FormControl(''),
        viewerEmails: new FormControl('')

    });

    constructor(private viewService: ViewService) {
    }

    ngOnInit(): void {
        this.viewService.currentBookingData$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap(this.data$$.next.bind(this.data$$)),
            tap(data => {
                const {title, audioDetails, captionDispDetails, viewerEmails} = data;
                this.form.setValue({
                    title,
                    audioDetails,
                    captionDispDetails,
                    /*requirePasscode: new FormControl(''),
                    requireLogin: new FormControl(''),*/
                    viewerEmails
                });

                console.log(this.form.value)
            })
        ).subscribe();

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    update(): void {
        if (this.form.valid) {
            this.saveChanges$$.next();
        }

    }

}
