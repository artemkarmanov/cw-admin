import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IAdminSession} from "@interfaces/session.interfaces";

@Component({
	selector: 'cwb-session-link',
	templateUrl: './session-link.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionLinkComponent implements ViewCell {
	@Input() value!: number
	@Input() rowData!: IAdminSession
}
