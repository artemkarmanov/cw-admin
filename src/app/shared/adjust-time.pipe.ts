import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';
import {map, Observable, of} from 'rxjs';
import {AuthService} from 'src/app/core/auth.service';
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
        if (timeZone) {
            return of(timeZone).pipe(map(tz => this.formatTime(start, tz)));
        } else {
            return this.userTimezone$.pipe(map(tz => this.formatTime(start, tz)));
        }
    }

    private formatTime(start: number, tz: string) {
        if (!start) return String(start);
        const dt = DateTime.fromMillis(start * 1000, {zone: tz})
            .toISO({format: 'extended'}).toString()
        const formattedDate = formatDate(dt, 'd MMM, y, h:mm a', this.locale)
            .replace(',', '');
        return formattedDate;
    }
}
