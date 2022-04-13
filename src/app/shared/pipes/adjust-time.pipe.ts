import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';
import {map, Observable, of} from 'rxjs';
import {formatDate} from '@angular/common';
import {UserState} from "@store/user.state";
import {Select} from "@ngxs/store";

@Pipe({name: 'adjustTime'})
export class AdjustTimePipe implements PipeTransform {
    @Select(UserState.userTimeZone) userTimezone$!: Observable<string>

    constructor(@Inject(LOCALE_ID) private locale: string) {}

    transform(start: number, timeZone?: string): Observable<string> {
        return timeZone ? 
            of(timeZone).pipe(map(tz => this.formatTime(start, tz))) :
            this.userTimezone$.pipe(map(tz => this.formatTime(start, tz)));
    }

    private formatTime(start: number, tz: string): string {
        const dateTime = DateTime.fromMillis(start * 1000, {zone: tz})
            .toISO({format: 'extended'}) ?? start;
        const dateTimeString = dateTime.toString();
        return formatDate(dateTimeString, 'dd MMM y hh:mm aa', this.locale)
            .replace(',', '');
    }
}
