import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'cwb-button-header',
	templateUrl: './button-header.component.html',
	styleUrls: ['./button-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonHeaderComponent {
}
