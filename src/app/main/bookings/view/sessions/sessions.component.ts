import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ISession} from '../../../../core/types';

@Component({
    selector: 'cwb-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsComponent implements OnInit {
    @Input() data!: ISession[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
