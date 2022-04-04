import {UsersTableActionsComponent} from "./users-table/users-table-actions/users-table-actions.component";

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
	isAdmin: {
		title: 'Admin',
		width: '125px'
	},
	isCaptioner: {
		title: 'Captioner',
		width: '125px'
	},
	actions: {
		title: 'Actions',
		sort: false,
		filter: false,
		type: 'custom',
		renderComponent: UsersTableActionsComponent
	}
}
