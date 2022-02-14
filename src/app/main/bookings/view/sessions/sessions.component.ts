import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ISession} from '../../../../core/types';
import {environment} from '../../../../../environments/environment';
import {Subject, takeUntil} from 'rxjs';

@Component({
    selector: 'cwb-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private editClick$$: Subject<number> = new Subject<number>();
    private cancelClick$$: Subject<number> = new Subject<number>();
    public isAdmin = environment.role;
    @Input() data!: ISession[];

    constructor() {
    }

    ngOnInit(): void {
        this.editClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable())
        ).subscribe()
        this.cancelClick$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable())
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    edit(id: number) {
        if (this.isAdmin) {
            this.editClick$$.next(id);
        }
    }

    cancel(id: number) {
        if (this.isAdmin) {
            this.cancelClick$$.next(id);
        }
    }

}
