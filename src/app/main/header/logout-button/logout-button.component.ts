import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {Subject, switchMap, takeUntil} from 'rxjs';

@Component({
    selector: 'cwb-logout-button',
    templateUrl: './logout-button.component.html',
    styleUrls: ['./logout-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private click$$: Subject<void> = new Subject<void>();

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.click$$.asObservable().pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => this.authService.logout$())
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    click(): void {
        this.click$$.next();
    }


}
