import {Injectable} from '@angular/core';
import {SocketMessagesService} from '../core/socket-messages.service';

@Injectable()
export class ChangePasswordService {

    constructor(private messages: SocketMessagesService) {
    }
}
