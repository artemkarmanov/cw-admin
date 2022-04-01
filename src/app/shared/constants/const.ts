import {InjectionToken} from '@angular/core';
import {StorageService} from 'ngx-webstorage-service';

export const TOKEN_SERVICE =
    new InjectionToken<StorageService>('TOKEN_SERVICE');
export const USER_INFO =
    new InjectionToken<StorageService>('USER_INFO');
export const MINIMUM_SESSION_DURATION = 10; //minutes
// const MINIMUM_BOOKING_OFFSET = 48; //hours
