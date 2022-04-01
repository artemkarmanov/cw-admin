import {INewSession, ISession} from "@interfaces/session.interfaces";

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
	oboUserId?: number;
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
