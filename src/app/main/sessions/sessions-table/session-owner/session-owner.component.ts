import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IAdminSession} from "@interfaces/session.interfaces";

@Component({
	selector: 'cwb-session-owner',
	templateUrl: './session-owner.component.html',
	styleUrls: ['./session-owner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionOwnerComponent implements ViewCell {
	@Input() value!: number
	@Input() rowData!: IAdminSession
}
