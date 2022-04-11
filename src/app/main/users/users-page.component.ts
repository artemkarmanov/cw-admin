import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsersService} from '@services/users.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {IUserRow} from "@interfaces/user.interfaces";
import {usersTableConfig} from "./users.table.config";
import {Title} from "@angular/platform-browser";

@Component({
	selector: 'cwb-users-page',
	templateUrl: './users-page.component.html',
	styleUrls: ['users-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
	public columnsConfig = usersTableConfig

	public users$: Observable<IUserRow[]> = this.usersService
		.getUsers$()
		.pipe(
			map((users) => users.map((user) =>
				({
					...user, role: user.isCaptioner && user.isAdmin
						? ['captioner', 'admin'] :
						user.isCaptioner
							? ['captioner']
							: user.isAdmin ? ['admin'] : ['viewer']
				} as IUserRow)))
		);

	constructor(
		private usersService: UsersService,
		private breadCrumbsService: BreadCrumbsService,
		private titleService: Title
	) {
	}

	ngOnInit(): void {
		this.titleService.setTitle('CaptionWorks | Users')
		this.breadCrumbsService.set([{
			path: '/users',
			title: 'Users'
		}]);
	}

	reload() {
		this.usersService.reload();
	}

}
