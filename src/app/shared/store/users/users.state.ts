import {Injectable} from "@angular/core";
import {Action, createSelector, Selector, State, StateContext} from "@ngxs/store";
import {IUser} from "@interfaces/user.interfaces";
import {GetUsersResponse} from "@store/users.actions";

export interface UsersStateModel {
	users: IUser[]
}

@Injectable()
@State({name: 'users'})
export class UsersState {
	@Selector()
	public static users(state: UsersStateModel) {
		return state.users.map((user) => ({
			...user,
			role: user.isCaptioner && user.isAdmin
				? ['captioner', 'admin']
				: user.isCaptioner
					? ['captioner']
					: user.isAdmin ? ['admin'] : ['viewer']
		}))
	}

	public static user(state: UsersStateModel) {
		return createSelector([UsersState], (id: number) => state.users.find(user => user.userId === id))
	}

	@Action(GetUsersResponse)
	private getUsersResponse(
		{patchState}: StateContext<UsersStateModel>,
		{data}: GetUsersResponse
	) {
		return patchState({users: data.users})
	}
}
