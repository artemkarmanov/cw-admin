import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IAdminSession} from "@interfaces/session.interfaces";
import {SessionsService} from "../../sessions.service";
import {SocketMessagesService} from "@services/socket-messages.service";

@Component({
  selector: 'cwb-session-table-actions',
  templateUrl: './session-table-actions.component.html',
  styleUrls: ['./session-table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTableActionsComponent implements ViewCell {
  @Input() value!: number
  @Input() rowData!: IAdminSession

  constructor(
      private messages: SocketMessagesService,
      private sessionService: SessionsService
  ) {
  }

  public showViewerLogs({sessionId}: IAdminSession) {
    this.sessionService
        .getSessionViewerLogs$(sessionId)
        .subscribe()
  }

  public showCaptionLogs({sessionId}: IAdminSession) {
    this.sessionService
        .getSessionCaptionLogs$(sessionId)
        .subscribe()
  }

  public cancel({sessionId}: IAdminSession) {
    this.sessionService
        .cancel$(sessionId)
        .subscribe()
  }

  public edit(session: IAdminSession) {
    this.sessionService
        .edit$(session)
        .subscribe()
  }
}
