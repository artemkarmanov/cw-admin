import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {filter} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {ISessionCaptionLogs} from "@interfaces/session.interfaces";

@Component({
    selector: 'cwb-session-caption-dialog',
    templateUrl: './session-caption-dialog.component.html',
    styleUrls: ['./session-caption-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionCaptionDialogComponent implements OnInit, OnDestroy {
    public isAdmin = environment.role === 'admin';
    public inEditMode = false;
    public data$$: BehaviorSubject<ISessionCaptionLogs[] | []> = new BehaviorSubject<ISessionCaptionLogs[] | []>([]);  
    
    private destroy$$: Subject<void> = new Subject<void>();
    private data$: Observable<ISessionCaptionLogs[]> = this.data$$.asObservable().pipe(
        filter(Boolean)
    );
    constructor(private modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.data$.pipe(
            takeUntil(this.destroy$$.asObservable()),
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    close() {
        this.modal.dismiss();
    }
}
