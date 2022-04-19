import {UsersTableActionsComponent} from "./users-table/users-table-actions/users-table-actions.component";
import {UsersRoleComponent} from "./users-table/users-role/users-role.component";

export const usersTableConfig = {
	firstName: {
		title: 'First Name'
	},
	lastName: {
		title: 'Last Name'
	},
	email: {
		title: 'Email',
	},
	role: {
		title: 'Role',
		type: 'custom',
		renderComponent: UsersRoleComponent,
		width: '218px',
		filter: {
			type: 'list',
			config: {
				selectText: 'All',
				list: [
					{value: 'admin', title: 'Admin'},
					{value: 'captioner', title: 'Captioner'},
					{value: 'viewer', title: 'Viewer'}
				],
			},
		}
	},
	actions: {
		title: 'Actions',
		sort: false,
		width: '102px',
		filter: false,
		type: 'custom',
		renderComponent: UsersTableActionsComponent
	}
}
