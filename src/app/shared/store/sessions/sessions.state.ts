import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {IAdminSession} from "@interfaces/session.interfaces";
import {GetSessionsSummaryResponse} from "@store/sessions.actions";

export interface SessionsStateModel {
	sessions: IAdminSession[]
}

@Injectable()
@State<SessionsStateModel>({name: 'sessions', defaults: {sessions: []}})
export class SessionsState {
	@Selector()
	public static sessions (state: SessionsStateModel) {
		return state.sessions
	}

	@Action(GetSessionsSummaryResponse)
	private getSessionsSummaryResponse(
		{patchState}: StateContext<SessionsStateModel>,
		{data}: GetSessionsSummaryResponse
	) {
		return patchState({sessions: data.sessions})
	}
}
