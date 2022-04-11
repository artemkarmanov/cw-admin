import {Component, OnInit} from '@angular/core';
import {CreateService} from '../create.service';

const TITLES: string[] = ['Tell us about your captioning requirements', 'Add audio and caption details', 'Tell us about your security requirements'];


@Component({
    selector: 'cwb-step-title',
    templateUrl: './step-title.component.html',
    styleUrls: ['./step-title.component.scss']
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
