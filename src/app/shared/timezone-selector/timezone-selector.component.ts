import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {TimezoneService} from '../../core/timezone.service';
import {BehaviorSubject, exhaustMap, Observable, Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {IRegion} from '../../core/types';
import {filter, tap} from 'rxjs/operators';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {DateTime} from 'luxon';

@Component({
    selector: 'cwb-timezone-selector',
    templateUrl: './timezone-selector.component.html',
    styleUrls: ['./timezone-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TimezoneSelectorComponent),
        multi: true
    },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TimezoneSelectorComponent),
            multi: true
        }
    ]
})
export class TimezoneSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input() required = true;
    private destroy$$: Subject<void> = new Subject<void>();
    private writeValue$$: Subject<string> = new Subject<string>();
    private cities$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public region: FormControl = new FormControl('', Validators.required);
    public city: FormControl = new FormControl('', Validators.required);
    public regions$: Observable<IRegion[]> = this.timezoneService.getRegions$().pipe(
        tap((regions) => {
            if (regions.length && !this.region.value && this.required) {
                this.region.setValue(regions[0].regionId);
            }

        })
    );
    public cities$: Observable<string[]> = this.cities$$.asObservable();


    constructor(private timezoneService: TimezoneService) {

    }

    ngOnInit(): void {
        this.writeValue$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap(console.log),
            exhaustMap((timezone) => this.timezoneService.getRegions$().pipe(
                tap((regions) => {
                    const [region, city] = timezone.split('/');

                    const regionId = regions.filter(_ => _.region === region).pop()?.regionId;
                    if (regionId) {
                        this.region.setValue(regionId,);
                        this.city.setValue(city);
                    }
                })
            )),
        ).subscribe();

        this.region.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((_) => {
                if (!_) {
                    this.city.setValue('');
                    this.cities$$.next([]);
                }
            }),
            filter(Boolean),
            switchMap((region) => {
                return this.timezoneService.getCities$(parseInt(region));
            }),
            tap(this.cities$$.next.bind(this.cities$$)),
            tap(cities => {
                if (!this.city.value || !cities.includes(this.city.value)) {
                    this.city.setValue(cities[0]);
                }
            })
        ).subscribe();

        this.city.valueChanges.pipe(
            takeUntil(this.destroy$$.asObservable()),
            tap((_) => {
                if (!_ && this.region.value) {
                    this.onChange('')
                }
            }),
            filter(Boolean),
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

    writeValue(timezone: string): void {
        this.writeValue$$.next(timezone || DateTime.now().zoneName);
    }

    validate() {
        let result: any = {
            invalid_timezone: true
        };
        if (this.city.value && this.region.value) {
            result = null;
        } else if (!this.required) {
            if ((!this.region.value && !this.city.value)) {
                result = null;
            }

        }
        return result;
    }
}
