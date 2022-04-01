import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CreateService} from './create.service';
import {from, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {BreadCrumbsService} from '@services/bread-crumbs.service';

@Component({
    selector: 'cwb-create',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CreateService
    ]
})
export class CreatePageComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private saveClick$$: Subject<void> = new Subject<void>();
    public disableNext$: Observable<boolean> = this.createService.isReadyForNextStep$.pipe(
        map(_ => !_),
    );

    constructor(
        private createService: CreateService, private router: Router,
        private breadCrumbsService: BreadCrumbsService
    ) {
        this.breadCrumbsService.set([
            {
                path: '/bookings',
                title: 'Bookings'
            },
            {
                title: 'New booking',
                path: ['bookings', 'create'].join('/')
            }
        ])
    }

    getStep() {
        return this.createService.getStep();
    }


    ngOnInit(): void {
        this.saveClick$$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => {
                return this.createService.create$();
            }),
            switchMap((_) => {
                return from(this.router.navigate(['bookings']));
            })
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$$.next();
    }

    next(): void {
        this.createService.nextStep();
    }

    back(): void {
        this.createService.previousStep();
    }

    save(): void {
        this.saveClick$$.next();
    }
}
