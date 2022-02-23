import {Injectable} from '@angular/core';
import {Observable, pluck} from 'rxjs';
import {SocketMessagesService} from '../../../core/socket-messages.service';

@Injectable()
export class StripeService {

    constructor(private messages: SocketMessagesService) {
    }

    getStripeClientSecret$(): Observable<string> {
        return this.messages.request$<{ stripeClientSecret: string }>('getStripeClientSecret').pipe(
            pluck('stripeClientSecret')
        )
    }
}
