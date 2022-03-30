import {InjectionToken} from '@angular/core';

export type TSessionStatus = 'Future' | 'Cancelled' | 'Running' | 'Completed';

export interface SocketMessagesConfig {
    host: string;
    reconnectionInterval?: number[];
}

/**
 * re-connecting - Before reconnection process was started
 * re-connected - Reconnection process completed successfully
 */
export type TIncident = 'connected' | 're-connecting' | 're-connected' | 'no-connection';

export class WSError extends Error {
    // tslint:disable-next-line:variable-name
    private readonly _status: number = 500;

    constructor(message: string = 'Unknown error', status?: number | string) {
        super(message);
        this.name = this.constructor.name;
        if (status) {
            this._status = parseInt(status.toString(), 10);
        }
    }

    public getStatus(): number {
        return this._status;
    }
}

export interface IWsIncident {
    type: TIncident;
    context?: unknown;
}

export interface IWsPacket<T> {
    type: string;
    data?: T;
    p: number;
    code?: number;
    info?: string;
    error?: string;
}

export type SocketInMessage = string;
export const WS_CONFIG_TOKEN = new InjectionToken<SocketMessagesConfig>('WS_CONFIG');

export interface ILoginResponse {
    loginToken: string;
    connectionId?: number | string;
}

export interface ISession {
    sessionId: number;
    startEpoch: number;
    sessionDurationMins: number;
    audioDetailsOverride?: string;
    captionDispOverride?: string;
    status: TSessionStatus;
    nonBilled?: 0 | 1;
    respeakerRateOverride?: number;
}

export interface IAdminSession {
    title: string;
    bookingToken: string;
    sessionId: number;
    startEpoch: number;
    bookingTimeZone: string;
    sessionDurationMins: number;
    status: TSessionStatus;
    ownerUserId: number;
    ownerFirstName: string;
    ownerLastName: string;
    ownerEmail: string
}

export interface IBookingSummary {
	  date?: string;
    bookingToken: string;
    title: string;
    bookingTimeZone: string;
    nextSessionStartEpoch: number;
    nextSessionDurationMins: number;
    totalSessions: number;
    countFutureSessions: number;
}

export interface IBooking {
    title: string;
    bookingToken: string;
    bookingPasscode: string;
    bookingCaptionerPasscode: string;
    bookingPasscodeHash: string;
    audioDetails: string;
    captionDispDetails: string;
    bookingTimeZone: string;
    sessions: ISession[];
    requirePasscode?: 0 | 1;
    requireLogin?: 0 | 1;
    viewerEmails?: string;
    authorisedViewersOnly: number;
}

export interface INewSession {
    day: number;//Day of week, 0 == Monday
    startHour: number;//Hour of start time 0-23
    startMin: number;//Minute of start time 0-59
    durationMins: number;//Minutes duration 0-1440
}

export interface INewBooking {
    title: string;
    startDate: string; //ISO 8601 date
    sessionList: INewSession[];
    timeZoneOverride?: string;
    countWeeks: number; //Number of weeks’ worth of sessionList     sessions to process. 1 indicates no     recurrences.
    audioDetails: string;
    captionDispDetails: string;
    requirePasscode?: 0 | 1;
    requireLogin?: 0 | 1;
    viewerEmails?: string;
}

export interface IUpdateBooking {
    title: string;
    audioDetails: string;
    captionDispDetails: string;
    requireLogin: number;
    viewerEmails?: string;
    requirePasscode: number;
    bookingPasscode: string;
    timeZoneOverride: string;
    authorisedViewersOnly: number;
    authorisedViewerEmails: string;
}

export interface IBookingModificationResponse {
    bookingToken: string;
    bookingPasscode: string;
    bookingPasscodeHash: string;
    bookingCaptionerPasscode?: string;
}

export interface IRegion {
    regionId: number;
    region: string;
}

// interface ITimeZone extends IRegion {
//     cities: string[];
// }

export interface INewUser {
    paymentMethodComplete: any;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    timezone: string;
    isCaptioner?: 0 | 1;
    isAdmin?: 0 | 1;
    respeakerRate?: number;
}

export interface IUserSettings {
    paymentMethodComplete: any;
    userId: number;
    timeZone: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ICreateSession {
    bookingToken: string;
    startEpoch: number;
    sessionDurationMins: number;
    audioDetailsOverride?: string;
    captionDispOverride?: string;
    nonBilled?: 0 | 1;
    respeakerRateOverride?: number;
}

export interface IAdminSession {
    title: string;
    bookingToken: string;
    sessionId: number;
    startEpoch: number;
    bookingTimeZone: string;
    sessionDurationMins: number;
    status: TSessionStatus;
    ownerUserId: number;
    ownerFirstName: string;
    ownerLastName: string;
    ownerEmail: string
}

export interface ISessionFilter {
    fromEpoch: number;
    toEpoch: number;
}

export interface ISessionCaptionLogs {
    captionLogId: number;
    endEpoch: number;
    firstName: string;
    lastName: string;
    startepoch: number;
    userId: number;
}

export interface IUser extends INewUser {
    userId: number;
}

export interface IUserFilter {
    emailName?: string;
    role?: 'admin' | 'captioner';
}

export interface IBilling {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    billingResultId: number,
    totalBill: number,
    success: 0 | 1,
    error: string,
    billedAtEpoch: number
}

export interface IBillingDetails extends Array<{
    billingDetailsId: number,
    sessionId: number,
    sessionBill: number,
    billedDuration: number,
    duration: number,
    rate: number
}> {}
