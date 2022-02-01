import {Inject, Injectable} from '@angular/core';
import {EMPTY, Observable, Subject, timer} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {catchError, filter, first, map, switchAll, switchMap, tap} from 'rxjs/operators';
import {IWsIncident, IWsPacket, SocketMessagesConfig, WS_CONFIG_TOKEN, WSError} from './types';

const DEFAULT_RECONNECTION_INTERVALS = [1, 2, 5, 10, 30, 60];
type SocketInMessage = string;

let messageId = 0;

@Injectable()
export class SocketMessagesService {
    /**
     * Ws server host string - got from external config
     * @private
     */
    private readonly host!: string;
    /**
     * Array of intervals in seconds when reconnection will be attempted.
     * If it is not set in config - DEFAULT_RECONNECTION_INTERVALS will be used
     * @private
     */
    private readonly reconnectionIntervals: number[] = DEFAULT_RECONNECTION_INTERVALS;
    /**
     * Emits value when first reconnection attempts
     * @private
     */
    private reconnecting$$: Subject<void> = new Subject();
    /**
     * Used to manage reconnection attempts
     * @private
     */
    private reconnecting$: Observable<void> = this.reconnecting$$.asObservable();

    private reconnectionInterval$$: Subject<number> = new Subject<number>();
    private attempts = 0;
    private incidents$$: Subject<IWsIncident> = new Subject<IWsIncident>();
    private socket$$?: WebSocketSubject<IWsPacket<unknown>>;
    private packets$$: Subject<Observable<IWsPacket<unknown>>> = new Subject<Observable<IWsPacket<unknown>>>();
    private messages$$: Subject<IWsPacket<unknown>> = new Subject<IWsPacket<unknown>>();
    private events$$: Subject<IWsPacket<unknown>> = new Subject<IWsPacket<unknown>>();
    private messages$!: Observable<IWsPacket<unknown>>;
    /**
     * Emits value on every reconnection attempt
     */
    public reconnectionInterval$: Observable<number> = this.reconnectionInterval$$.asObservable();
    /**
     * List of incidents happened during session
     */
    public incidents$: Observable<IWsIncident> = this.incidents$$.asObservable();
    /**
     * Emits events when they happened
     */
    public events$: Observable<unknown> = this.events$$.pipe(
        map(_ => {
            return _.data;
        })
    );

    constructor(
        @Inject(WS_CONFIG_TOKEN) config: SocketMessagesConfig
    ) {

        if (config.reconnectionInterval) {
            this.reconnectionIntervals = config.reconnectionInterval;
        }
        this.host = config.host;
        //at first - subscribe to packets
        this.packets$$.asObservable().pipe(
            switchAll(),
            tap(packet => {
                //if (packet.msg !== 'event') {
                this.messages$$.next(packet);
                // } else {
                //     this.events$$.next(packet);
                // }
            })
        ).subscribe();
        this.messages$ = this.messages$$.asObservable().pipe(
            tap(packet => {
                if (!packet.code || packet.code !== 200) {
                    //401 - is unauthenticated
                    //403 - authenticated but has not enough access rights to the resource
                    throw new WSError((packet.info) ? packet.info : packet.error, packet.code);
                }
            })
        );

        this.reconnecting$.pipe(
            tap(() => {
                if (!this.attempts) {
                    // first attempt to re-connect
                    this.incidents$$.next({type: 're-connecting'});
                }
            }),
            map(() => {
                return this.attempts++;
            }),
            tap(index => {
                if (this.reconnectionIntervals[index] === undefined) {
                    this.reconnecting$$.complete();
                } else {
                    console.debug('Trying to reconnect  - next attempt will start in %s second(s)', this.reconnectionIntervals[index]);
                }

            }),
            filter(index => this.reconnectionIntervals[index] !== undefined),
            map(index => this.reconnectionIntervals[index]),
            switchMap(startAfter => timer(startAfter * 1000)),
            tap(() => this.reconnectionInterval$$.next(this.reconnectionIntervals[this.attempts])),
        ).subscribe({
            next: () => {
                this.connect();
            },
            complete: () => {
                this.incidents$$.next({type: 'no-connection'});
                console.debug('Number of reconnection attempts exhausted.');
            }
        });
        //order makes sense
        this.connect();
    }

    /**
     * Send a request using web socket, wait for response and send it to user
     * @param type
     * @param data
     */
    request$<T>(type: SocketInMessage, data?: unknown): Observable<T> {
        if (!this.isConnected()) {
            throw new Error('No connection');
        }
        const p = ++messageId;
        const packet = {
            p,
            type
        };
        if (data) {
            Object.assign(packet, {data});
        }
        //@todo check why socket$$ should be forced
        (this.socket$$ as WebSocketSubject<IWsPacket<T>>).next(packet);

        return (this.messages$ as Observable<IWsPacket<T>>).pipe(
            filter((packet: IWsPacket<T>) => {
                return packet.p === p;
            }),
            map(_ => _.data as T),
            first(),
            tap((_) => console.debug('Request %o; Response %o', {msg: type, data}, _)),
        );
    }

    /**
     * Public method to initiate forced reconnection
     */
    forceConnect(): void {
        this.attempts = 0;
        console.debug('Reconnection forced');
        this.connect();
    }

    close(): void {
        if (this.socket$$) {
            this.socket$$.complete();
        }
    }

    private isConnected(): boolean {
        return !!this.socket$$ && !this.socket$$.closed;
    }

    private getNewWebSocket$$(): WebSocketSubject<IWsPacket<unknown>> {
        return webSocket({
            url: this.host,
            openObserver: {
                next: () => {
                    this.incidents$$.next({
                            type: (!this.attempts) ? 'connected' : 're-connected'
                        }
                    );
                    this.attempts = 0;
                    console.log('[DataService]: connection started');
                },
                error: () => {
                    console.log('[DataService]: connection error');
                }
            },

            closeObserver: {
                next: () => {
                    console.log('[DataService]: connection closed', arguments);
                    this.socket$$ = undefined;
                    this.reconnecting$$.next();
                }
            },
        });
    }

    private connect(): void {
        if (!this.socket$$ || this.socket$$.closed) {
            this.socket$$ = this.getNewWebSocket$$();
            const wsObservable$ = this.socket$$.pipe(
                catchError((e: Error) => {
                    //connection error
                    this.socket$$ = undefined;
                    //throw new WSError(e.message);

                    return EMPTY;
                }),
            );
            this.packets$$.next(wsObservable$);
        }
    }


}
