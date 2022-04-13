import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@services/dialog.service";

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

    constructor(
        private dialogRef: DialogRef,
        @Inject(DIALOG_DATA) public data: {
            title: string
            cancelText: string
            confirmText: string
            text: string
        }
    ) {
    }

    ngOnInit(): void {
        Object.assign(this, this.data)
    }

    cancel() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close(true);
    }
}
