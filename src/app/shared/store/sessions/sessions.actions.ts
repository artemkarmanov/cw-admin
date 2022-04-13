import {HttpStatusCode} from "@angular/common/http";
import {IAdminSession} from "@interfaces/session.interfaces";

export class GetSessionsSummaryResponse {
	static readonly type = 'getSessionsSummaryResp'

	constructor(
		public data: {sessions: IAdminSession[]},
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}
