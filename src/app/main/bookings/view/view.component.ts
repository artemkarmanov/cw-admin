import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {pluck, Subject, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ViewService} from './view.service';

@Component({
    selector: 'cwb-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ViewService
    ]
})
export class ViewComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            takeUntil(this.destroy$$.asObservable()),
            pluck('booking_id'),
            tap(console.log)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
