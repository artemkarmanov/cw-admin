import {Injectable} from '@angular/core';
import {BookingService} from '../booking.service';
import {BehaviorSubject, distinctUntilChanged, Observable, pluck} from 'rxjs';
import {DateTime} from 'luxon';
import {MINIMUM_SESSION_DURATION, DEFAULT_SESSION_DURATION} from '@constants/const';
import {AuthService} from '@services/auth.service';
import {map, switchMap} from 'rxjs/operators';
import {INewSession} from "@interfaces/session.interfaces";
import {INewBooking} from "@interfaces/booking.interfaces";

@Injectable()
export class CreateService {
    private step: number = 1;
    private readyForNextStep$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isReadyForNextStep$: Observable<boolean> = this.readyForNextStep$$.asObservable().pipe(
        distinctUntilChanged(),
    );
    private data: Partial<INewBooking> = {
        countWeeks: 1
    };

    private _startTime?: string;
    private _durationMins: number = DEFAULT_SESSION_DURATION;
    private _overrunCaptioning = true;

    constructor(private bookingService: BookingService, private authService: AuthService) {

    }

    get startTime(): string {
        // This makes the start time selector default to 12:00 AM
        return this._startTime || '00:00';
    }

    set startTime(time) {
        this._startTime = time;
    }


    get durationMins(): number {
        return this._durationMins || MINIMUM_SESSION_DURATION;
    }

    set durationMins(count: number) {
        this._durationMins = count;
    }

    get title(): string {
        return this.data.title || '';
    }

    set title(title) {
        this.data.title = title;
    }

    get startDate(): string {
        return this.data.startDate || '';
    }

    set startDate(startDate) {
        this.data.startDate = startDate;
    }

    get oboUserId(): number | undefined {
        return this.data.oboUserId || undefined
    }

    set oboUserId(oboUserId: number | undefined) {
        this.data.oboUserId = Number(oboUserId) || undefined
    }

    get countWeeks(): number {
        return this.data.countWeeks || 1;
    }

    set countWeeks(count: number) {
        this.data.countWeeks = count;
    }

    get audioDetails(): string {
        return this.data.audioDetails || '';
    }

    set audioDetails(details: string) {
        this.data.audioDetails = details;
    }

    get captionDispDetails(): string {
        // This defaults to the message below (Captions can be viewed...) for now
        // but can be changed to blank '' later.
        return this.data.captionDispDetails || 'Captions can be viewed in the CaptionWorks viewer';
    }

    set captionDispDetails(details: string) {
        this.data.captionDispDetails = details;
    }

    get timeZone(): string | undefined {
        return this.data.timeZoneOverride;
    }

    set timeZone(zone: string | undefined) {
        if (zone) {
            this.data.timeZoneOverride = zone;
        }
    }

    get requirePasscode(): 0 | 1 {
        return (this.data.requirePasscode) ? 1 : 0;
    }

    set requirePasscode(value: 0 | 1) {
        this.data.requirePasscode = value;
    }

    get requireLogin(): 0 | 1 {
        return (this.data.requireLogin) ? 1 : 0;
    }

    set requireLogin(value: 0 | 1) {
        this.data.requireLogin = value;
    }


    get viewerEmails(): string | undefined {
        return this.data.viewerEmails;
    }

    set viewerEmails(value: string | undefined) {
        this.data.viewerEmails = value;
    }

    set overrunCaptioning(value: boolean) {
        this._overrunCaptioning = value;
    }

    get overrunCaptioning(): boolean {
        return this._overrunCaptioning;
    }


    public getStep(): number {
        return this.step;

    }

    public nextStep() {
        this.step++;
    }

    public previousStep() {
        this.step--;
    }

    public create$() {
        return this.getData$().pipe(
            switchMap(this.bookingService.createBooking$.bind(this.bookingService))
        );
    }

    currentStepFormIsValid(state: boolean): void {
        this.readyForNextStep$$.next(state);
    }


    private buildSessionList(): INewSession[] {
        const date = DateTime.fromISO(this.startDate);
        const time = DateTime.fromISO(this.startTime);

        return [
            {
                startHour: time.get('hour'),
                startMin: time.get('minute'),
                day: date.get('weekday') - 1,
                durationMins: this.durationMins,
                allowOverrun: this.overrunCaptioning ? 1 : 0
            }
        ];
    }

    private getData$(): Observable<INewBooking> {
        return this.authService.userSettings$.pipe(
            pluck('timeZone'),
            map((timeZone) => {
                const result = {
                    title: this.title,
                    startDate: this.startDate,
                    countWeeks: this.countWeeks,
                    sessionList: this.buildSessionList(),
                    audioDetails: this.audioDetails,
                    captionDispDetails: this.captionDispDetails,
                    requirePasscode: this.requirePasscode,
                    requireLogin: this.requireLogin,
                    viewerEmails: this.viewerEmails,
                    oboUserId: this.oboUserId
                };
                // This used to be just an if statement, and if the "this.timeZone"
                // was different from "timeZone", it would add data to the object,
                // then write that data to the database on the backend (associated with the
                // booking).  However, if they were the same, no timezone-related data
                // would be added to the object, resulting in no data being saved to the database
                // resulting in a "Region: Unknown" and "Country: Unknown" situation 
                // if the user chose to view their booking in detail.  So, I added the 
                // else statement  here
                if (this.timeZone !== timeZone) {
                    Object.assign(result, {timeZoneOverride: this.timeZone});
                } else {
                    Object.assign(result, {timeZoneOverride: timeZone});
                }

                return result;

            })
        )
    }
}
