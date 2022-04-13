export enum TSessionStatus {
	Future = 'Future',
	Cancelled = 'Cancelled',
	Running = 'Running',
	Completed = 'Completed'
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
	allowOverrun: 0 | 1;
	SetRespeakerRateOverride?: 0 | 1;
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

export interface INewSession {
	day: number;//Day of week, 0 == Monday
	startHour: number;//Hour of start time 0-23
	startMin: number;//Minute of start time 0-59
	durationMins: number;//Minutes duration 0-1440
	allowOverrun: 0 | 1;
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
	allowOverrun: 0 | 1;
}

export interface ISessionFilter {
	fromEpoch: number;
	toEpoch: number;
}

export interface ISessionCaptionLogs {
	captionLogId: number
	connectionId: string
	email: string
	endEpoch: number
	firstName: string
	startepoch: number
	userId: number
}

export interface ISessionViewerLog  {
	viewerLogId: number
	userId: number
	firstName: string
	lastName: string
	email: string
	endEpoch: number
	startepoch: number
	connectionId: string
}
