import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BreadCrumbsService} from '../../../core/bread-crumbs.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'cwb-bread-crumbs',
    templateUrl: './bread-crumbs.component.html',
    styleUrls: ['./bread-crumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbsComponent implements OnInit {
    public data$ = this.breadCrumbsService.path$.pipe(
        map(breadcrumbs => {
            breadcrumbs.unshift({
                path: '/bookings',
                title: 'Bookings'
            });
            return breadcrumbs;
        })
    );

    constructor(private breadCrumbsService: BreadCrumbsService) {

    }

    ngOnInit(): void {

    }

}
