import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[cwbStatus]'
})
export class StatusDirective {

    constructor(private el: ElementRef) {
        // const status = el.nativeElement as HTMLSpanElement;

        const classes = el.nativeElement.classList;
        classes.add('badge');
        classes.add('rounded-pill');
        classes.add('bg-primary');

    }

}
