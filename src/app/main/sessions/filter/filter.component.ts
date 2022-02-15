import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ISessionFilter} from '../../../core/types';
import {DateTime} from 'luxon';

@Component({
    selector: 'cwb-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
    private values$$: BehaviorSubject<ISessionFilter> = new BehaviorSubject<ISessionFilter>({
        fromEpoch: DateTime.now().toMillis(),
        toEpoch: DateTime.now().plus({day: 20}).toMillis()
    });


    constructor() {
    }

    ngOnInit(): void {
    }

    public get$(): Observable<ISessionFilter> {
        return this.values$$.asObservable();
    }
}
