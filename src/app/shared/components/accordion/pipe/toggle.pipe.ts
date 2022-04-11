import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'getToggleFunction'})
export class TogglePipe implements PipeTransform{
  /**
   * Make the toggle function available to be called from
   * outside.
   * @param i - index of the accordion item
   * @param toggleFn idk
   */
  transform(i: number, toggleFn: Function){
    return () => toggleFn(i);
  }
}
