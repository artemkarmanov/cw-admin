import {HttpStatusCode} from "@angular/common/http";
import {
	IAdminSession,
	ISessionCaptionLogs,
	ISessionViewerLog
} from "@interfaces/session.interfaces";
import {ResponseType} from "@constants/response-type";

export class GetSessionsSummaryResponse {
	static readonly type = ResponseType.GetSessionsSummaryResponse

	constructor(
		public data: {sessions: IAdminSession[]},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class GetSessionViewerLogsResponse {
	static readonly type = ResponseType.GetSessionViewerLogsResponse

	constructor(
		public data: {logs: ISessionViewerLog[]},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class ClearSessionViewerLogs {
	static readonly type = '[Session] Clear Viewer Logs'
}

export class GetCaptionLogsResponse {
	static readonly type = ResponseType.GetSessionCaptionLogsResponse

	constructor(
		public data: {logs: ISessionCaptionLogs[]},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class ClearCaptionLogs {
	static readonly type = '[Session] Clear Caption Logs'
}
