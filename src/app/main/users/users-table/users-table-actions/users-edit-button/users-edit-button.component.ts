import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {IUser} from "@interfaces/user.interfaces";

@Component({
	selector: 'cwb-users-edit-button',
	templateUrl: './users-edit-button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersEditButtonComponent {
	@Input() user!: IUser;
}
