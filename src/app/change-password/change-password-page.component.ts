import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'cwb-change-password',
    templateUrl: './change-password-page.component.html',
    styleUrls: ['./change-password-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
