import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
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
    public form = new FormGroup({
        listOfViewers: new FormControl('')
    });

    public listForTextArea: string = "";

    constructor() {
    }

    ngOnInit(): void {
        this.viewers.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            debounceTime(300),
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


    addViewersFromList() {
        // This adds the viewers from the list, and then pushes them to the 
        // array for "add individual viewers" as well.

        // Just so we don't accidentally add the same viewers twice, let's 
        // empty the array
        this.viewers.clear();

        let viewersAsArray = this.form.value.listOfViewers.split("\n")
        for (var v in viewersAsArray) {
            this.viewers.push(
                new FormControl(viewersAsArray[v], [Validators.required, Validators.email])
            )
        }
    }

}
