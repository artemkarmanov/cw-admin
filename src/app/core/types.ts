import {InjectionToken} from '@angular/core';

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
    token: string;
    connectionId?: number | string;
}

export interface ISession {
    sessionId: number;
    startEpoch: number;
    sessionDurationMins: number;
    audioDetailsOverride?: string;
    captionDispOverride?: string;
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
    captionDistDetails: string;
    requirePasscode?: 0 | 1;
    requireLogin?: 0 | 1;
    viewerEmails?: string;
}

export interface ICreateBookingResponse {
    bookingToken: string;
    bookingPasscode: string;
    bookingPasscodeHash: string;
    bookingCaptionerPasscode: string;
}
