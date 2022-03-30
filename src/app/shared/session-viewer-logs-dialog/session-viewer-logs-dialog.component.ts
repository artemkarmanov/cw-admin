import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { Subject, BehaviorSubject, Observable, filter, takeUntil, tap, map } from 'rxjs';
import { MINIMUM_SESSION_DURATION } from 'src/app/core/const';
import { ISession, ISessionViewerLog} from 'src/app/core/types';
import { environment } from 'src/environments/environment';


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

  constructor(private modal: NgbActiveModal) {

  }

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
      this.modal.dismiss();
  }

}

