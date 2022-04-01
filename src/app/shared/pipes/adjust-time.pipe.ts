import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';
import {map, Observable, of} from 'rxjs';
import {AuthService} from 'src/app/shared/services/auth.service';
import {formatDate} from '@angular/common';

@Pipe({
    name: 'adjustTime'
})
export class AdjustTimePipe implements PipeTransform {

    constructor(
        private authService: AuthService,
        @Inject(LOCALE_ID) private locale: string) {}

    private userTimezone$: Observable<string> = this.authService.userSettings$
        .pipe(map(data => data.timeZone ? data.timeZone : 'America/New_York'));

    transform(start: number, timeZone?: string): Observable<string> {
        return timeZone ? 
            of(timeZone).pipe(map(tz => this.formatTime(start, tz))) :
            this.userTimezone$.pipe(map(tz => this.formatTime(start, tz)));
    }

    private formatTime(start: number, tz: string): string {
        const dateTime = DateTime.fromMillis(start * 1000, {zone: tz})
            .toISO({format: 'extended'}) ?? start;
        const dateTimeString = dateTime.toString();
        return formatDate(dateTimeString, 'd MMM, y, h:mm a', this.locale)
            .replace(',', '');
    }
}
