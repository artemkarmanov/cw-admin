import {Injectable} from '@angular/core';
import {CreateServiceProviderModule} from './create-service-provider.module';
import {BookingService} from '../booking.service';
import {INewBooking, INewSession} from '../../../core/types';
import {BehaviorSubject, Observable} from 'rxjs';

const MINIMUM_SESSION_DURATION = 10;

@Injectable({
    providedIn: CreateServiceProviderModule
})
export class CreateService {
    private step: number = 1;
    private readyForNextStep$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private data: Partial<INewBooking> = {
        countWeeks: 1
    };

    private _startTime?: string;

    get startTime(): string {
        return this._startTime || '';
    }

    constructor(private bookingService: BookingService) {
    }

    set startTime(time) {
        this._startTime = time;
    }

    private _durationMins: number = MINIMUM_SESSION_DURATION;

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
        return this.data.captionDispDetails || '';
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
        //this.currentStepFormIsValid(false);
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

    isReadyForNextStep$(): Observable<boolean> {
        return this.readyForNextStep$$.asObservable();
    }

    private buildSessionList(): INewSession[] {
        return [];
    }

    private getData(): INewBooking {
        return {
            title: this.title,
            startDate: this.startDate,
            countWeeks: this.countWeeks,
            sessionList: this.buildSessionList(),
            audioDetails: this.audioDetails,
            captionDispDetails: this.captionDispDetails,
            requirePasscode: this.requirePasscode,
            requireLogin: this.requireLogin,
            viewerEmails: this.viewerEmails
        }
    }
}
