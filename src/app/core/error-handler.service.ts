import {Injectable} from '@angular/core';

@Injectable()
export class ErrorHandlerService {

    constructor() {
    }

    public handle(error: Error) {
        console.error(error);
    }
}
