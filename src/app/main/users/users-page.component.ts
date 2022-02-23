import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/users.service';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {IUser, IUserFilter} from '../../core/types';
import {map} from 'rxjs/operators';
import {BreadCrumbsService} from '../../core/bread-crumbs.service';

@Component({
    selector: 'cwb-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
    private filter$$: BehaviorSubject<IUserFilter> = new BehaviorSubject<IUserFilter>({});

    public users$: Observable<IUser[]> = this.filter$$.asObservable().pipe(
        switchMap(filter => {
            return this.usersService.getUsers$().pipe(
                map((_) => {
                    let users = [..._];
                    return users.filter(user => {
                        let result = true;

                        if (filter.role === 'admin') {
                            result = result && Boolean(user.isAdmin);
                        } else if (filter.role === 'captioner') {
                            result = result && Boolean(user.isCaptioner);
                        }

                        if (filter.emailName) {
                            const nameFilter = filter.emailName.toLowerCase();
                            result = result && (user.email.includes(nameFilter) || user.lastName.toLowerCase().includes(nameFilter) || user.firstName.toLowerCase().includes(nameFilter))
                        }
                        return result;
                    });
                }),
            )
        })
    );

    constructor(
        private usersService: UsersService,
        private breadCrumbsService: BreadCrumbsService
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbsService.set([{
            path: '/users',
            title: 'Users'
        }]);
    }

    filterChanged(filter: IUserFilter) {
        this.filter$$.next(filter);
    }

    reload() {
        this.usersService.reload();
    }

}
