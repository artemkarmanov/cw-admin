import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'cwb-password-reset',
    templateUrl: './password-reset-page.component.html',
    styleUrls: ['./password-reset-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
