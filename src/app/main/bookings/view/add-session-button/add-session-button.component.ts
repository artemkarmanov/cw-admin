import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, withLatestFrom} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';
import {ModalService} from '../../../../core/modal.service';
import {NewSessionDialogComponent} from '../new-session-dialog/new-session-dialog.component';
import {ViewService} from '../view.service';

@Component({
    selector: 'cwb-add-session-button',
    templateUrl: './add-session-button.component.html',
    styleUrls: ['./add-session-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSessionButtonComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private click$$: Subject<void> = new Subject<void>();

    constructor(
        private modalService: ModalService,
        private viewService: ViewService
    ) {
    }

    ngOnInit(): void {
        this.click$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => {
                return this.modalService.open$(NewSessionDialogComponent)
            }),
            filter(Boolean),
            withLatestFrom(this.viewService.currentBookingData$),
            tap(console.log)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    click(): void {
        this.click$$.next();
    }

}
