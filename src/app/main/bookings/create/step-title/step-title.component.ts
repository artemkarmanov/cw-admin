import {Component, OnInit} from '@angular/core';
import {CreateService} from '../create.service';

const TITLES: string[] = ['Fill the general detail', 'Add audio and caption details', 'Setup the access'];


@Component({
    selector: 'cwb-step-title',
    templateUrl: './step-title.component.html',
    styleUrls: ['./step-title.component.scss'],
    //@todo fix onPush
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTitleComponent implements OnInit {


    public total: number = TITLES.length;

    constructor
    (
        private createService: CreateService
    ) {
    }

    get current(): number {
        return this.createService.getStep();
    }

    get title(): string {
        return TITLES[this.current - 1];
    }

    ngOnInit(): void {
    }

}
