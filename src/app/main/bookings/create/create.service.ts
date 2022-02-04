import {Injectable} from '@angular/core';
import {BookingService} from '../booking.service';
import {INewBooking, INewSession} from '../../../core/types';
import {BehaviorSubject, distinctUntilChanged, Observable} from 'rxjs';
import {DateTime} from 'luxon';

const MINIMUM_SESSION_DURATION = 10; //minutes
const MINIMUM_BOOKING_OFFSET = 48; //hours

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
    private _durationMins: number = MINIMUM_SESSION_DURATION;

    constructor(private bookingService: BookingService) {

    }

    get startTime(): string {
        return this._startTime || '';
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
        return this.data.captionDistDetails || '';
    }

    set captionDispDetails(details: string) {
        this.data.captionDistDetails = details;
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
        return this.data.requirePasscode || 0;
    }

    set requirePasscode(value: 0 | 1) {
        this.data.requirePasscode = value;
    }

    get requireLogin(): 0 | 1 {
        return this.data.requireLogin || 0;
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
        return this.bookingService.createBooking$(this.getData());
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
                durationMins: this.durationMins
            }
        ];
    }

    private getData(): INewBooking {
        return {
            title: this.title,
            startDate: this.startDate,
            countWeeks: this.countWeeks,
            sessionList: this.buildSessionList(),
            audioDetails: this.audioDetails,
            captionDistDetails: this.captionDispDetails,
            requirePasscode: this.requirePasscode,
            requireLogin: this.requireLogin,
            viewerEmails: this.viewerEmails
        }
    }
}
