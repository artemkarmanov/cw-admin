import {Component, Input} from '@angular/core'

@Component({
	selector: 'cw-svg-icon',
	templateUrl: './svg-icon.component.html',
	styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent {
	@Input() svg: string | undefined
	@Input() independent: boolean | undefined
}
