import {Injectable} from '@angular/core';
import {SocketMessagesService} from './socket-messages.service';
import {EMPTY, Observable, of, pluck, ReplaySubject, Subject, switchMap, tap} from 'rxjs';
import {IRegion} from './types';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerService} from './error-handler.service';

@Injectable()
export class TimezoneService {
    private loadRegions$$: Subject<void> = new Subject();
    private regions$$: ReplaySubject<IRegion[]> = new ReplaySubject<IRegion[]>(1);
    private citiesCache: Map<number, string[]> = new Map();

    constructor(private messages: SocketMessagesService, errors: ErrorHandlerService) {
        this.loadRegions$$.pipe(
            switchMap(() => this.messages.request$<{ regions: IRegion[] }>('getTimeZoneRegions')),
            pluck('regions'),
            tap(this.regions$$.next.bind(this.regions$$)),
            catchError(err => {
                errors.handle(err);
                return EMPTY;
            })
        ).subscribe();
    }

    public getRegions$(): Observable<IRegion[]> {
        this.loadRegions$$.next();
        return this.regions$$.asObservable().pipe();
    }

    public getCities$(regionId: number): Observable<string[]> {
        if (this.citiesCache.has(regionId)) {
            return of(this.citiesCache.get(regionId) as string[]);
        } else {
            return this.messages.request$<{ regionId: number, cities: string[] }>('getTimeZoneCities', {regionId}).pipe(
                pluck('cities'),
                tap((cities) => {
                    this.citiesCache.set(regionId, cities);
                })
            );
        }
    }
}
