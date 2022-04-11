import {Directive, EventEmitter, OnInit, Output} from '@angular/core';

@Directive({selector: '[cwLoaded]'})
export class LoadedDirective implements OnInit{
  @Output() public loaded = new EventEmitter

  ngOnInit() {
    this.loaded.emit()
  }
}
