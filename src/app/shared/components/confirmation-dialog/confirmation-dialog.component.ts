import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DialogRef} from "@services/dialog.service";

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

    constructor(private dialogRef: DialogRef) {
    }

    ngOnInit(): void {
    }

    cancel() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close(true);
    }
}
