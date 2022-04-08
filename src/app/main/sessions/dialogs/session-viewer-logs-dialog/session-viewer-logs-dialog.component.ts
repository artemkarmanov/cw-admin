import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject, BehaviorSubject, Observable, filter, takeUntil, map} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ISessionViewerLog} from "@interfaces/session.interfaces";
import {DialogRef} from "@services/dialog.service";

@Component({
  selector: 'cwb-session-viewer-logs-dialog',
  templateUrl: './session-viewer-logs-dialog.component.html',
  styleUrls: ['./session-viewer-logs-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionViewerLogsDialogComponent implements OnInit, OnDestroy {
  private destroy$$: Subject<void> = new Subject<void>();
  public isAdmin = environment.role === 'admin';
  public inEditMode = false;
  public data$$: BehaviorSubject<ISessionViewerLog[] | null> = new BehaviorSubject<ISessionViewerLog[] | null>(null);
  public data$: Observable<ISessionViewerLog[]> = this.data$$.asObservable().pipe(
      filter(Boolean)
  );

  public form!: FormGroup;

  constructor(private modal: DialogRef) {}

  ngOnInit(): void {
      this.data$.pipe(
          takeUntil(this.destroy$$.asObservable()),
          map(stuff => stuff.map((st) => {
            console.log(st)

           }))

      ).subscribe()
  }

  ngOnDestroy(): void {
      this.destroy$$.next();
  }

  close() {
      this.modal.close();
  }
}
