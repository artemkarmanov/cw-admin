import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../../core/socket-messages.service';
import {Observable, pluck} from 'rxjs';
import {IAdminSession} from '../../core/types';

@Injectable()
export class SessionsService {

    constructor(private messages: SocketMessagesService) {
    }

    public getSessions$(fromEpoch: number, toEpoch: number, start?: number, count?: number): Observable<IAdminSession[]> {
        return this.messages.request$<{ sessions: IAdminSession[] }>('getSessions', {
            fromEpoch, toEpoch, start, count
        }).pipe(
            pluck('sessions')
        )

    }
}
