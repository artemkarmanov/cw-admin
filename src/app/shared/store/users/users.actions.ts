import {IUser} from "@interfaces/user.interfaces";
import {HttpStatusCode} from "@angular/common/http";

export class GetUsersResponse {
	static readonly type = 'getUsersResp'

	constructor(
		public data: {users: IUser[]},
		public p: number,
		public code: HttpStatusCode,
		public error: string
	) {
	}
}
