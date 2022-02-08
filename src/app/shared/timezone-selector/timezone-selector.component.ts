import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {TimezoneService} from '../../core/timezone.service';
import {BehaviorSubject, Observable, Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {IRegion} from '../../core/types';
import {tap} from 'rxjs/operators';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
    selector: 'cwb-timezone-selector',
    templateUrl: './timezone-selector.component.html',
    styleUrls: ['./timezone-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TimezoneSelectorComponent),
        multi: true
    }]
})
export class TimezoneSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private destroy$$: Subject<void> = new Subject<void>();
    private cities$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public region: FormControl = new FormControl('', Validators.required);
    public city: FormControl = new FormControl('', Validators.required);
    public regions$: Observable<IRegion[]> = this.timezoneService.getRegions$().pipe(
        tap((regions) => {
            this.region.setValue(regions[0].regionId);
        })
    );
    public cities$: Observable<string[]> = this.cities$$.asObservable();


    constructor(private timezoneService: TimezoneService) {

    }

    ngOnInit(): void {

        this.region.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap((region) => {
                return this.timezoneService.getCities$(parseInt(region));
            }),
            tap(this.cities$$.next.bind(this.cities$$)),
            tap(cities => {
                this.city.setValue(cities[0]);
            })
        ).subscribe();

        this.city.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            //@todo better to fix it
            withLatestFrom(this.regions$),
            tap(([city, regions]) => {

                const {region} = regions.filter(region => region.regionId === parseInt(this.region.value)).pop() as IRegion;
                const zone = [region, city].join('/');
                this.onChange(zone);
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
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

    writeValue(obj: any): void {
    }


}
