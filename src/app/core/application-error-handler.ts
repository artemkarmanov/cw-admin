import {ErrorHandler, Injectable} from '@angular/core';
import {ErrorHandlerService} from './error-handler.service';


@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {

    constructor(
        private errorHandlerService: ErrorHandlerService
    ) {

    }


    handleError(error: Error): void {
        this.errorHandlerService.handle(error);
    }

}
