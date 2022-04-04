import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IUser} from "@interfaces/user.interfaces";

@Component({
  selector: 'cwb-users-table-actions',
  templateUrl: './users-table-actions.component.html',
  styleUrls: ['./users-table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableActionsComponent implements ViewCell {
  @Input() value!: string | number;
  @Input() rowData!: IUser;
}
