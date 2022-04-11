import {animate, state, style, transition, trigger} from "@angular/animations"
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation
} from "@angular/core"
import {AccordionItem} from "./directives/accordion-item.directive"

@Component({
  selector: "cw-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({height: '*', opacity: 1, visibility: 'visible'})),
      state('collapsed', style({height: '0px', opacity: 0, visibility: 'hidden'})),
      transition('expanded <=> collapsed',
          animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ])
  ]
})
export class AccordionComponent {
  expanded = new Set<number>()
  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
   */
  @Input() collapsing = true

  @ContentChildren(AccordionItem) items!: QueryList<AccordionItem>

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index)
    } else {
      if (this.collapsing) {
        this.expanded.clear()
      }
      this.expanded.add(index)
    }
  }
}
