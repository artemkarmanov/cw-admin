import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IAdminSession} from "@interfaces/session.interfaces";

@Component({
  selector: 'cwb-session-status-badge',
  templateUrl: './session-status-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionStatusBadgeComponent implements ViewCell {
  @Input() value!: number
  @Input() rowData!: IAdminSession
}
