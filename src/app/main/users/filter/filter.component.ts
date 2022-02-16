import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {IUserFilter} from '../../../core/types';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'cwb-user-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    public emailName: FormControl = new FormControl('');
    public role: FormControl = new FormControl('');
    @Output() changed: EventEmitter<IUserFilter> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        this.emailName.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            distinctUntilChanged(),
            tap((emailName) => {
                this.changed.emit({
                    emailName,
                    role: this.role.value
                })
            })
        ).subscribe();
        this.role.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((role) => {
                this.changed.emit({
                    emailName: this.emailName.value,
                    role
                })
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
