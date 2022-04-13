import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {environment} from '@env';
import {SessionsService} from '../../../sessions/sessions.service';
import {ISession} from "@interfaces/session.interfaces";

@Component({
    selector: 'cwb-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsComponent {
    public isAdmin = environment.role === 'admin';
    @Input() data!: ISession[];
    @Input() bookingTimeZone?: string;

    constructor(private sessionService: SessionsService) {
    }

    edit(session: ISession) {
        if (this.isAdmin) {
            this.sessionService.edit$(session)
        }
    }

    cancel(id: number) {
        if (this.isAdmin) {
            this.sessionService.cancel$(id)
        }
    }

    isEditable(session: ISession): boolean {
        return session.status === 'Future';
    }
}
