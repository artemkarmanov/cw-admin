import {HttpStatusCode} from '@angular/common/http'
import {ResponseType} from '@constants/response-type'
import {IRegions, IUserSettings} from "@interfaces/user.interfaces";

export class NewUserResponse {
	static readonly type = ResponseType.NewUserResponse

	constructor(
		public data: {loginToken: string; connectionId: string},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class LogInResponse {
	static readonly type = ResponseType.LogInResponse

	constructor(
		public data: {loginToken: string; connectionId: string},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class ReLogInResponse {
	static readonly type = ResponseType.ReLogInResponse

	constructor(
		public data: {loginToken: string; connectionId: string},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class LogOutResponse {
	static readonly type = ResponseType.LogOutResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetUserSettingsResponse {
	static readonly type = ResponseType.GetUserSettingsResponse

	constructor(
		public data: IUserSettings,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class StartResetPasswordResponse {
	static readonly type = ResponseType.StartResetPasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class CheckResetPasswordResponse {
	static readonly type = ResponseType.CheckResetPasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class ChangePasswordResponse {
	static readonly type = ResponseType.ChangePasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetTimeZoneRegionsResponse {
	static readonly type = ResponseType.GetTimeZoneRegionsResponse

	constructor(
		public data: IRegions,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetTimeZoneCitiesResponse {
	static readonly type = ResponseType.GetTimeZoneCitiesResponse

	constructor(
		public data: {cities: string[]},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}
