import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../../../core/socket-messages.service';
import {Observable, pluck} from 'rxjs';
import {ModalService} from '../../../core/modal.service';
import {ViewService} from './view.service';

@Injectable()
export class SessionService {

    constructor(
        private modalService: ModalService,
        private messages: SocketMessagesService,
        private viewService: ViewService,
    ) {
    }

    add$(): Observable<number> {
        return this.messages.request$<{ sessionId: number }>('addSession', session).pipe(
            pluck('sessionId')
        );
    }
}
