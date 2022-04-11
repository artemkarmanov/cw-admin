import {AfterViewInit, Directive, Input} from '@angular/core';

@Directive({selector: '[cwbSmartTablePaginator]'})
export class SmartTablePaginatorDirective implements AfterViewInit {
  @Input() ref!: any

  ngAfterViewInit() {
    const pager = document.querySelector('ng2-smart-table-pager')
    document.querySelector('.selector')!.removeAttribute('hidden')
    pager!.append(this.ref!)
  }
}
