import {ChangeDetectionStrategy, Component} from '@angular/core';
import {environment} from '@env';

@Component({
    selector: 'cwb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
    public isAdmin = environment.role === 'admin';
}
