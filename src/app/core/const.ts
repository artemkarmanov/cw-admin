import {InjectionToken} from '@angular/core';
import {StorageService} from 'ngx-webstorage-service';

export const TOKEN_SERVICE =
    new InjectionToken<StorageService>('TOKEN_SERVICE');
export const USER_INFO =
    new InjectionToken<StorageService>('USER_INFO');
