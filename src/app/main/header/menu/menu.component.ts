import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'cwb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
    public isAdmin = environment.role === 'admin';

    constructor() {
    }

    ngOnInit(): void {
    }

}
