import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cwb-new-session-dialog',
    templateUrl: './new-session-dialog.component.html',
    styleUrls: ['./new-session-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSessionDialogComponent implements OnInit {

    constructor(private modal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    save() {
        this.modal.close();
    }

    close() {
        this.modal.dismiss();
    }

}
