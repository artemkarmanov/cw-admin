import {Component, Input} from '@angular/core'

@Component({
	selector: 'cw-small-button',
	templateUrl: './small-button.component.html',
	styleUrls: ['./small-button.component.scss']
})
export class SmallButtonComponent {
	@Input() public buttonText: string | undefined
	@Input() public inverted: boolean | undefined
	@Input() public buttonDisabled: boolean | undefined
	@Input() public autofocus: boolean | undefined
	@Input() public smaller: boolean | undefined
	@Input() public icon: string | undefined
}
