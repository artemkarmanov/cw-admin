import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: 'table'
})
export class TableDirective {

    constructor(el: ElementRef) {
        (el.nativeElement as HTMLTableElement).classList.add('table', 'align-middle');
    }

}
