import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IUser} from "@interfaces/user.interfaces";

@Component({
  selector: 'cwb-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersRoleComponent implements ViewCell {
  @Input() public rowData!: IUser
  public value!: number
}
