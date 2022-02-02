import {Component} from '@angular/core';
import {SocketMessagesService} from './core/socket-messages.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {AuthService} from './core/auth.service';
import {TIncident} from './core/types';

@Component({
    selector: 'cwb-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
    title = 'cw-booking';

    constructor(socketMessagesService: SocketMessagesService, authService: AuthService) {
        socketMessagesService.incidents$.pipe(
            filter(incident => (['re-connected', 'connected'] as TIncident[]).includes(incident.type)),
            switchMap(() => authService.reLogin$()),
        ).subscribe();

        socketMessagesService.incidents$.pipe(
            filter(i => i.type === ('re-connecting' as TIncident)),
            tap(() => {
                console.log('reconnecting')
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
