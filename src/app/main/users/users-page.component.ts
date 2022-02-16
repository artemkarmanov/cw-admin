import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/users.service';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {IAdminUser, IUserFilter} from '../../core/types';
import {map} from 'rxjs/operators';

@Component({
    selector: 'cwb-users-page',
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
    private filter$$: BehaviorSubject<IUserFilter> = new BehaviorSubject<IUserFilter>({});

    public users$: Observable<IAdminUser[]> = this.filter$$.asObservable().pipe(
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

    constructor(private usersService: UsersService) {
    }

    ngOnInit(): void {

    }

    filterChanged(filter: IUserFilter) {
        this.filter$$.next(filter);
    }

}
