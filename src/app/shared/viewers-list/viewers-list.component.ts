import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'cwb-viewers-list',
    templateUrl: './viewers-list.component.html',
    styleUrls: ['./viewers-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ViewersListComponent),
        multi: true
    }]
})
export class ViewersListComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private destroy$$: Subject<void> = new Subject<void>();
    public viewers = new FormArray([]);

    constructor() {
    }

    ngOnInit(): void {
        this.viewers.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            debounceTime(1000),
            tap(() => this.refresh())
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    writeValue(obj: string): void {
        if (obj) {
            obj.split('\\n').map(_ => {
                this.viewers.push(
                    new FormControl(_, [Validators.required, Validators.email])
                )
            });
        } else {
            this.add();
        }
    }

    public onTouched = () => {
    }

    public onChange = (value: any) => {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    add() {
        this.viewers.push(
            new FormControl('', [Validators.required, Validators.email])
        )
    }

    remove(i: number) {
        const lastOne = (this.viewers.length === 1);

        this.viewers.removeAt(i);
        if (lastOne) {
            this.add();
        }
        this.refresh();
    }

    refresh() {
        const result = (this.viewers.value as string[]).join('\\n');
        this.onChange(result);
    }

}
