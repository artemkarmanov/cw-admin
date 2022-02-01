import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'cwb-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    public isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$();

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

}
