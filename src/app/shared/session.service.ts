import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../core/socket-messages.service';
import {Observable, pluck} from 'rxjs';
import {ModalService} from '../core/modal.service';
import {IAdminSession, ICreateSession, ISession, ISessionCaptionLogs} from '../core/types';
import {SessionDialogComponent} from './session-dialog/session-dialog.component';
import {filter, switchMap} from 'rxjs/operators';
import {ConfirmationService} from './confirmation.service';
import {SharedProviderModule} from './shared-provider.module';
import {SessionCaptionDialogComponent} from './session-caption-dialog/session-caption-dialog.component';

@Injectable({
    providedIn: SharedProviderModule
})
export class SessionService {

    constructor(
        private modalService: ModalService,
        private messages: SocketMessagesService,
        private confirmationService: ConfirmationService,
    ) {
    }

    public add$(): Observable<unknown> {
        return this.modalService.open$(SessionDialogComponent).pipe(
            //filter(Boolean),
        )
    }

    public edit$(sessionData: ISession | IAdminSession): Observable<unknown> {
        return this.modalService.open$<any, SessionDialogComponent>(SessionDialogComponent, {}, (instance) => {
            instance.data$$.next(sessionData);
        }).pipe(
            filter(Boolean),
            switchMap((session) => {
                Object.assign(session, {
                    sessionId: sessionData.sessionId
                });
                return this.updateSession$(session);
            }),
        )
    }

    public cancel$(id: number): Observable<unknown> {
        return this.confirmationService.open$('Are you sure you want to cancel the session?').pipe(
            switchMap(() => {
                return this.cancelSession$(id);
            }),
        );
    }

    public getSessionsSummary$(fromEpoch: number, toEpoch: number, start?: number, count?: number): Observable<IAdminSession[]> {
        return this.messages.request$<{ sessions: IAdminSession[] }>('getSessionsSummary', {
            fromEpoch, toEpoch, start, count
        }).pipe(
            pluck('sessions')
        )

    }

    public addSession$(session: ICreateSession): Observable<number> {
        return this.messages.request$<{ sessionId: number }>('addSession', session).pipe(
            pluck('sessionId')
        );
    }

    public getSessionCaptionLogs$(sessionId: number): Observable<ISessionCaptionLogs[]> {
        return this.messages.request$<{ logs: ISessionCaptionLogs[] }>('getSessionCaptionLogs', {
            sessionId
        }).pipe(
            pluck('logs')
        );
    }

    public openSessionCaptionDialog$(sessionId: number, sesssionLogs$: ISessionCaptionLogs[]): Observable<unknown> {
        return this.modalService.open$<any, SessionCaptionDialogComponent>(SessionCaptionDialogComponent, {}, (instance) => {
            instance.data$$.next(sesssionLogs$);
        }).pipe(
                filter(Boolean),
                switchMap((session) => {
                    Object.assign(session, {
                        sessionId
                    });
                    return this.updateSession$(session);
                }),
            )
    }
    

    private updateSession$(session: ISession | IAdminSession): Observable<unknown> {
        return this.messages.request$('updateSession', session).pipe(

        );
    }




    private cancelSession$(sessionId: number): Observable<unknown> {
        return this.messages.request$('cancelSession', {sessionId}).pipe(

        );
    }
}
