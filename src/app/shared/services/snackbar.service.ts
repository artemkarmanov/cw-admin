import {Injectable, InjectionToken, Injector, NgZone} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ComponentType, Overlay, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";

export interface SnackBarConfig {
  data?: any
}

export const SNACKBAR_DATA = new InjectionToken<any>('SNACKBAR_DATA')

export class SnackBarRef {
  private afterClosedSubject = new Subject<any>()

  constructor(private overlayRef: OverlayRef) {
  }

  public close(result?: any) {
    this.overlayRef.dispose()
    this.afterClosedSubject.next(result)
    this.afterClosedSubject.complete()
  }

  public afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable()
  }
}

@Injectable({providedIn: 'root', deps: [Overlay]})
export class SnackbarService {
  constructor(
      private overlay: Overlay,
      private injector: Injector,
      private zone: NgZone
  ) {
  }

  open<T>(component: ComponentType<T>, config?: SnackBarConfig): SnackBarRef {
    const positionStrategy: PositionStrategy = this.overlay
        .position()
        .global()
        .right()
        .bottom()

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      panelClass: 'snack-bar-panel',
      backdropClass: 'snack-bar-backdrop'
    })

    const snackBarRef = new SnackBarRef(overlayRef)

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {provide: SnackBarRef, useValue: snackBarRef},
        {provide: SNACKBAR_DATA, useValue: config?.data}
      ]
    })

    this.zone.run(() => {
      const portal = new ComponentPortal(component, null, injector)
      overlayRef.attach(portal)
    })

    return snackBarRef
  }
}
