import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {
	IAdminSession, IAdminSessionRow,
	ISessionCaptionLogs,
	ISessionViewerLog
} from "@interfaces/session.interfaces";
import {
	ClearCaptionLogs,
	ClearSessionViewerLogs,
	GetCaptionLogsResponse,
	GetSessionsSummaryResponse,
	GetSessionViewerLogsResponse
} from "@store/sessions.actions";

export interface SessionsStateModel {
	sessions: IAdminSession[]
	viewerLogs: ISessionViewerLog[]
	captionLogs: ISessionCaptionLogs[]
}

@Injectable()
@State<SessionsStateModel>({
	name: 'sessions',
	defaults: {sessions: [], viewerLogs: [], captionLogs: []}
})
export class SessionsState {
	@Selector()
	public static sessions(state: SessionsStateModel): IAdminSessionRow[] {
		return state.sessions.map((session) => ({
			...session,
			owner: `${session.ownerEmail}\n${session.ownerFirstName} ${session.ownerLastName}`
		}) as IAdminSessionRow)
	}

	@Selector()
	public static viewerLogs(state: SessionsStateModel) {
		return state.viewerLogs
	}

	@Selector()
	public static captionLogs(state: SessionsStateModel) {
		return state.captionLogs
	}

	@Action(GetSessionsSummaryResponse)
	private getSessionsSummaryResponse(
		{patchState}: StateContext<SessionsStateModel>,
		{data}: GetSessionsSummaryResponse
	) {
		return patchState({sessions: data.sessions})
	}

	@Action(GetSessionViewerLogsResponse)
	private getSessionViewerLogsResponse(
		{patchState}: StateContext<SessionsStateModel>,
		{data}: GetSessionViewerLogsResponse
	) {
		return patchState({viewerLogs: data.logs})
	}

	@Action(ClearSessionViewerLogs)
	private clearSessionViewerLogs(
		{patchState}: StateContext<SessionsStateModel>,
	) {
		return patchState({viewerLogs: []})
	}

	@Action(GetCaptionLogsResponse)
	private getCaptionLogsResponse(
		{patchState}: StateContext<SessionsStateModel>,
		{data}: GetCaptionLogsResponse
	) {
		return patchState({captionLogs: data.logs})
	}

	@Action(ClearCaptionLogs)
	private clearCaptionLogs(
		{patchState}: StateContext<SessionsStateModel>,
	) {
		return patchState({captionLogs: []})
	}
}
