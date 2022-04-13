import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsersService} from '@services/users.service';
import {Observable} from 'rxjs';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IUserRow} from "@interfaces/user.interfaces";
import {usersTableConfig} from "./users.table.config";
import {Title} from "@angular/platform-browser";
import {Select} from "@ngxs/store";
import {UsersState} from "@store/users.state";

@Component({
	selector: 'cwb-users-page',
	templateUrl: './users-page.component.html',
	styleUrls: ['users-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
	public columnsConfig = usersTableConfig
	@Select(UsersState.users) public users$!: Observable<IUserRow[]>

	constructor(
		private usersService: UsersService,
		private breadCrumbsService: BreadCrumbsService,
		private titleService: Title
	) {
	}

	ngOnInit(): void {
		this.usersService.load$()
		this.titleService.setTitle('CaptionWorks | Users')
		this.breadCrumbsService.set([{
			path: '/users',
			title: 'Users'
		}]);
	}

	reload() {
	}
}
