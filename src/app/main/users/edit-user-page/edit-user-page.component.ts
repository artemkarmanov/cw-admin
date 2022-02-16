import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, withLatestFrom} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {UsersService} from '../../../core/users.service';

@Component({
    selector: 'cwb-edit-user-page',
    templateUrl: './edit-user-page.component.html',
    styleUrls: ['./edit-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserPageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private users$ = this.usersService.getUsers$();

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.usersService.getUsers$().pipe(
            takeUntil(this.destroy$$.asObservable()),
            withLatestFrom(this.route.params, (users, params) => {
                const {id} = params;
                return users.filter(user => user.userId === parseInt(id));
            }),
            map((users) => {
                if (!users.length) throw new Error('User not found');
                return users.pop();
            }),
            tap(console.log)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

}
