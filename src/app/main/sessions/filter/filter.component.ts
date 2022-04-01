import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DateTime} from 'luxon';
import {FormControl, FormGroup} from '@angular/forms';
import {ISessionFilter} from "@interfaces/session.interfaces";

@Component({
    selector: 'cwb-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private values$$: BehaviorSubject<ISessionFilter> = new BehaviorSubject<ISessionFilter>({
        fromEpoch: DateTime.now().toMillis(),
        toEpoch: DateTime.now().plus({day: 20}).toMillis()
    });
    public form: FormGroup = new FormGroup({
        fromEpoch: new FormControl(DateTime.now().toISODate()),
        toEpoch: new FormControl(DateTime.now().plus({day: 20}).toISODate())
    })


    constructor() {
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    public get$(): Observable<ISessionFilter> {
        return this.values$$.asObservable();
    }

    filter() {
        if (this.form.valid) {
            this.values$$.next({
                fromEpoch: DateTime.fromISO(this.form.get('fromEpoch')?.value).toMillis(),
                toEpoch: DateTime.fromISO(this.form.get('toEpoch')?.value).toMillis(),
            })
        }
    }

}
