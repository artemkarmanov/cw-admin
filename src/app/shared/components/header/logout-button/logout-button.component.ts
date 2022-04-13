import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Component({
    selector: 'cwb-logout-button',
    templateUrl: './logout-button.component.html',
    styleUrls: ['./logout-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent {
    @Dispatch()
    public logout() {
        return new Send({type: MessageType.LogOut})
    }
}
