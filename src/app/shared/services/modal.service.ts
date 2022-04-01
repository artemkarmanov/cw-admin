import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {filter, map} from 'rxjs/operators';


const DEFAULT_PARAMS = {centered: true, backdrop: 'static', keyboard: false, width: "80%"};

@Injectable({providedIn: 'root'})
export class ModalService {
    constructor(
        private modal: NgbModal
    ) {
    }

    open$<T, T1>(component: any, parameters: NgbModalOptions = {}, callback?: (instance: T1) => any | void): Observable<T> {
        const modalRef: NgbModalRef = this.open(component, parameters);
        if (callback) {
            callback(modalRef.componentInstance as T1);
        }
        return from(modalRef.result.catch(() => false)).pipe(
            filter(Boolean),
            map(_ => _ as T)
        );

    }

    open(component: unknown, parameters: NgbModalOptions = {}): NgbModalRef {
        return this.modal.open(component, Object.assign({}, parameters, DEFAULT_PARAMS));
    }
}
