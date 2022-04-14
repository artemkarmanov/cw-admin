import {Injectable} from '@angular/core';
import {SharedProviderModule} from '../../shared-provider.module';
import {Observable} from 'rxjs';
import {ConfirmationDialogComponent} from '@cmp/confirmation-dialog/confirmation-dialog.component';
import {DialogService} from "@services/dialog.service";

@Injectable({providedIn: SharedProviderModule})
export class ConfirmationService {

	constructor(private dialog: DialogService) {
	}

	open$(
		message: string,
		confirmBtnText = 'Confirm',
		cancelBtnText = 'Cancel'
	): Observable<boolean> {
		return this.dialog
			.open(ConfirmationDialogComponent, {
					data: {
						text: message,
						confirmText: confirmBtnText,
						cancelText: cancelBtnText
					}
				}
			)
			.afterClosed()
	}
}
