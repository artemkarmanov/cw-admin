import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Breadcrumbs, BreadcrumbsState} from "@store/breadcrumbs.state";
import {Observable} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {ClearBreadcrumbs} from "@store/breadcrumbs.actions";

@Component({
    selector: 'cwb-bread-crumbs',
    templateUrl: './bread-crumbs.component.html',
    styleUrls: ['./bread-crumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbsComponent implements OnInit {
    @Select(BreadcrumbsState) public breadcrumbs$!: Observable<Breadcrumbs>

    constructor(
        private router: Router,
        private store: Store
    ) {
    }

    ngOnInit() {
        this.router
            .events
            .pipe(
                filter((event) => event instanceof NavigationStart),
            )
            .subscribe(
                () => this.store.dispatch(new ClearBreadcrumbs())
            )
    }
}
