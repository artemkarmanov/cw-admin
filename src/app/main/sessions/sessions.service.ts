import {Injectable} from '@angular/core';
import {Observable, take, tap} from 'rxjs';
import {SessionDialogComponent} from './dialogs/session-dialog/session-dialog.component';
import {filter} from 'rxjs/operators';
import {ConfirmationService} from '@services/confirmation.service';
import {IAdminSession, ICreateSession, ISession} from "@interfaces/session.interfaces";
import {DialogService} from "@services/dialog.service";
import {SharedModule} from "../../shared/shared.module";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {
	SessionViewerLogsDialogComponent
} from "./dialogs/session-viewer-logs-dialog/session-viewer-logs-dialog.component";
import {
	SessionCaptionDialogComponent
} from "./dialogs/session-caption-dialog/session-caption-dialog.component";
import {ClearCaptionLogs, ClearSessionViewerLogs} from "@store/sessions.actions";

@Injectable({providedIn: SharedModule})
export class SessionsService {

	constructor(
		private dialog: DialogService,
		private confirmationService: ConfirmationService,
	) {
	}

	public add$(): Observable<unknown> {
		return this.dialog.open(SessionDialogComponent).afterClosed().pipe(
			//filter(Boolean),
		)
	}

	public edit$(sessionData: ISession | IAdminSession): Observable<unknown> {
		return this.dialog
			.open(SessionDialogComponent, {data: sessionData})
			.afterClosed()
			.pipe(
				filter(Boolean),
				tap((session: ISession | IAdminSession) => {
					Object.assign(session, {
						sessionId: sessionData.sessionId
					});
					return this.updateSession$(session);
				}),
			)
	}

	public cancel$(id: number) {
		this.confirmationService.open$('Are you sure you want to cancel the session?', 'Yes', 'No')
			.pipe(
				take(1),
				filter(Boolean),
				tap(() => this.cancelSession$(id))
			)
			.subscribe()
	}

	@Dispatch()
	public getSessionsSummary$(fromEpoch?: number, toEpoch?: number) {
		return new Send({
			type: MessageType.GetSessionsSummary,
			data: {fromEpoch, toEpoch}
		})
	}

	@Dispatch()
	public getSessionViewerLogs$(sessionId: number) {
		this.dialog.open(SessionViewerLogsDialogComponent)
		return [
			new ClearSessionViewerLogs(),
			new Send({
				type: MessageType.GetSessionViewerLogs,
				data: {sessionId}
			})
		]
	}

	@Dispatch()
	public getSessionCaptionLogs$(sessionId: number) {
		this.dialog.open(SessionCaptionDialogComponent)
		return [
			new ClearCaptionLogs(),
			new Send({
				type: MessageType.GetSessionCaptionLogs,
				data: {sessionId}
			})
		]
	}

	@Dispatch()
	public addSession$(session: ICreateSession) {
		return new Send({
			type: MessageType.AddSession,
			data: session
		})
	}

	@Dispatch()
	private updateSession$(session: ISession | IAdminSession) {
		return new Send({
			type: MessageType.UpdateSession,
			data: session
		})
	}

	@Dispatch()
	private cancelSession$(sessionId: number) {
		return new Send({
			type: MessageType.CancelSession,
			data: {sessionId}
		})
	}
}
