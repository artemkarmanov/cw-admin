import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cwb-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent implements OnInit {
    public text!: string;
    public title = 'Confirmation';
    public cancelText = 'Cancel';
    public confirmText = 'Confirm';

    constructor(private modal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    cancel() {
        this.modal.dismiss();
    }

    confirm() {
        this.modal.close(true);
    }

}
