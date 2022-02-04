import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CreateService} from './create.service';
import {from, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'cwb-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CreateService
    ]
})
export class CreateComponent implements OnInit, OnDestroy {
    private destroy$$: Subject<void> = new Subject<void>();
    private saveClick$$: Subject<void> = new Subject<void>();
    public isReadyForNextStep$: Observable<boolean> = this.createService.isReadyForNextStep$();

    constructor(private createService: CreateService, private router: Router) {
        console.log('construct')
    }

    get step() {
        return this.createService.getStep();
    }


    ngOnInit(): void {
        console.log('ngOnInit')
        this.saveClick$$.pipe(
            takeUntil(this.destroy$$.asObservable()),
            switchMap(() => {
                return this.createService.create$();
            }),
            switchMap((result) => {
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
