import {Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';
import {map, Observable, of} from 'rxjs';
import {AuthService} from 'src/app/core/auth.service';

@Pipe({
    name: 'adjustTime'
})
export class AdjustTimePipe implements PipeTransform {

    constructor(private authService: AuthService) {}

    private userTimezone$: Observable<string> = this.authService.userSettings$
        .pipe(map(data => data.timeZone ? data.timeZone : 'America/New_York'));

    transform(start: number, timeZone?: string): Observable<string> {
        if (timeZone) {
            return of(timeZone).pipe(map(tz => AdjustTimePipe.formatTime(start, tz)));
        } else {
            return this.userTimezone$.pipe(map(tz => AdjustTimePipe.formatTime(start, tz)));
        }
    }

    private static formatTime(start: number, tz: string): string {
        if (!start) return String(start);
        const dt = DateTime.fromMillis(start * 1000, {zone: tz});
        return dt.toISO({format: 'extended'})?.toString();
    }
}
