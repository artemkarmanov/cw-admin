/*
 * - Since this token is for internal purposes only, we would not export
 *   this file outside the library.
 * - Creating the DI token in a separate file helps prevent
 *   circular dependencies.
 */
import {InjectionToken} from '@angular/core';
import {SocketMessagesConfig} from './types';

export const WS_CONFIG_TOKEN = new InjectionToken<SocketMessagesConfig>('WS_CONFIG');
