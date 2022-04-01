import {Injectable} from '@angular/core';
import {SharedProviderModule} from '../shared-provider.module';
import {Observable} from 'rxjs';
import {ModalService} from './modal.service';
import {ConfirmationDialogComponent} from '@cmp/confirmation-dialog/confirmation-dialog.component';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: SharedProviderModule
})
export class ConfirmationService {

    constructor(private modalService: ModalService) {
    }

    open$(message: string, confirmBtnText = 'Confirm', cancelBtnText = 'Cancel'): Observable<boolean> {
        return this.modalService.open$<Observable<boolean>, any>(ConfirmationDialogComponent, {
            size: 'sm'
        }, (instance: ConfirmationDialogComponent) => {
            instance.text = message;
            instance.confirmText = confirmBtnText;
            instance.cancelText = cancelBtnText;
        }).pipe(
            map(_ => !!_)
        )
    }
}
