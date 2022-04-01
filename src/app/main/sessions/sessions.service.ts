import {Injectable} from '@angular/core';
import {SocketMessagesService} from '@services/socket-messages.service';
import {Observable, pluck} from 'rxjs';
import {ModalService} from '@services/modal.service';
import {SessionDialogComponent} from './dialogs/session-dialog/session-dialog.component';
import {filter, map, switchMap} from 'rxjs/operators';
import {ConfirmationService} from '@services/confirmation.service';
import {SharedProviderModule} from '../../shared/shared-provider.module';
import {SessionCaptionDialogComponent} from './dialogs/session-caption-dialog/session-caption-dialog.component';
import { SessionViewerLogsDialogComponent } from './dialogs/session-viewer-logs-dialog/session-viewer-logs-dialog.component';
import {
    IAdminSession,
    ICreateSession,
    ISession,
    ISessionCaptionLogs,
    ISessionViewerLog
} from "@interfaces/session.interfaces";

@Injectable({
    providedIn: SharedProviderModule
})
export class SessionsService {

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

    public getSessionViewerLogs$(sessionId: number): Observable<unknown> {
        console.log("here")
        return this.messages.request$<{ logs: ISessionViewerLog[] }>('getSessionViewerLogs', {
            sessionId
        }).pipe(
            pluck('logs'),
            map(stuff => stuff.map((_) => {
                console.log(stuff)
                return this.modalService.open$<any, SessionViewerLogsDialogComponent>(SessionViewerLogsDialogComponent, {size: "xl"}, (instance) => {
                    instance.data$$.next(stuff);
               })
              }))
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
