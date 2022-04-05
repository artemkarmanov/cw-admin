import {Component} from '@angular/core';
import {SocketMessagesService} from '@services/socket-messages.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '@services/auth.service';
import {TIncident} from "@interfaces/websocket.interfaces";

@Component({
    selector: 'cwb-root',
    template: `<router-outlet></router-outlet>`,
    styles: []
})
export class AppComponent {
    constructor(socketMessagesService: SocketMessagesService, authService: AuthService) {
        socketMessagesService.incidents$.pipe(
            filter(incident => (['re-connected', 'connected'] as TIncident[]).includes(incident.type)),
            switchMap(() => authService.reLogin$()),
        ).subscribe();

        socketMessagesService.incidents$.pipe(
            filter(i => i.type === ('re-connecting' as TIncident)),
            tap(() => {
                console.debug('Reconnecting')
            }),
        ).subscribe();
        socketMessagesService.incidents$.pipe(
            filter(i => i.type === 'no-connection' as TIncident),
            tap(() => {
                throw new Error('Connection to server was lost and can\'t be established.');
            }),
        ).subscribe();
    }
}
