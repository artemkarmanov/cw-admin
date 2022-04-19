import {IUser} from "@interfaces/user.interfaces";
import {ResponseType} from "@constants/response-type";
import {HttpStatusCode} from "@angular/common/http";

export class Login {
	static readonly type = '[User] Login'

	constructor(public payload: IUser) {}
}

export class Logout {
	static readonly type = '[User] Logout'

	constructor() {}
}

export class Relogin {
	static readonly type = '[User] Relogin'

	constructor() {}
}

export class GetUserSettings {
	static readonly type = '[User] Get Settings'

	constructor() {}
}

export class GetStripeClientSecretResponse {
	static readonly type = ResponseType.GetStripeClientSecretResponse

	constructor(
		public data: {stripeClientSecret: string}
	) {
	}
}

export class UpdateUserResponse {
	static readonly type = ResponseType.UpdateUserResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}
