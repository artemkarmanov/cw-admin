import {IUser} from "@interfaces/user.interfaces";

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
	static readonly type = 'getStripeClientSecretResp'

	constructor(
		public data: {stripeClientSecret: string}
	) {
	}
}
