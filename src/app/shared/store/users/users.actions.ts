import {IUser} from "@interfaces/user.interfaces";
import {HttpStatusCode} from "@angular/common/http";
import {ResponseType} from "@constants/response-type";

export class GetUsersResponse {
	static readonly type = ResponseType.GetUsersResponse

	constructor(
		public data: {users: IUser[]},
		public p: number,
		public code: HttpStatusCode,
		public error: string
	) {
	}
}
