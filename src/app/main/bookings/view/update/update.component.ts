import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ViewService} from '../view.service';
import {Observable} from 'rxjs';
import {IBooking} from '../../../../core/types';

@Component({
    selector: 'cwb-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnInit {
    public data$: Observable<IBooking> = this.viewService.currentBookingData$;

    constructor(private viewService: ViewService) {
    }

    ngOnInit(): void {
    }

}
