import {Injectable} from '@angular/core'
import {Action, NgxsOnInit, State, StateContext} from '@ngxs/store'
import {
	ConnectWebSocket,
	SendWebSocketMessage,
	WebSocketConnected,
	WebSocketDisconnected,
	WebsocketMessageError
} from '@ngxs/websocket-plugin'
import {Send} from './websocket.send.actions'
import {of} from 'rxjs'
import {delay, take, tap} from 'rxjs/operators'
import {MessageType} from '@constants/message-types'
import {ErrorHandlerService} from "@services/error-handler.service"

interface WebSocketStateModel {
	packetId: number
	subscriptions: {data: any; type: MessageType}[]
}

const defaults: WebSocketStateModel = {
	packetId: 1,
	subscriptions: []
}

@State<WebSocketStateModel>({name: 'websocket', defaults})
@Injectable()
export class WebsocketState implements NgxsOnInit {
	private retryCount: number = 0
	private retryDelays: number[] = [2, 4, 8, 16, 32, 64]

	constructor(private error: ErrorHandlerService) {
	}

	ngxsOnInit({patchState}: StateContext<WebSocketStateModel>) {
		patchState({subscriptions: []})
	}

	/** @desc reconnection */
	@Action(WebSocketDisconnected)
	private webSocketDisconnected({dispatch}: StateContext<WebSocketStateModel>) {
		return of('anything').pipe(
			take(1),
			tap(() => this.error.handle(`You are disconnected. Retrying in ${this.retryDelays[this.retryCount]} seconds`)),
			delay(this.retryDelays[this.retryCount] * 1000 || 0),
			tap(() => {
				this.retryDelays[this.retryCount] !== undefined
					? dispatch(new ConnectWebSocket())
					: window.location.reload()
				this.retryCount += 1
			})
		)
	}

	/** @desc send formatted message */
	@Action(Send)
	private send(
		{getState, patchState, dispatch}: StateContext<WebSocketStateModel>,
		{payload}: Send
	) {
		if (
			payload.type === MessageType.LogIn ||
			payload.type === MessageType.ReLogIn
		) {
			const {data, type} = payload
			patchState({subscriptions: [...getState().subscriptions, {data, type}]})
		}

		dispatch(new SendWebSocketMessage({p: getState().packetId, ...payload}))
		return patchState({packetId: getState().packetId + 1})
	}

	@Action(WebSocketConnected)
	private webSocketConnected({
		getState,
		dispatch,
		patchState
	}: StateContext<WebSocketStateModel>) {
		if (this.retryCount > 0) {
			getState().subscriptions.forEach((sub) => {
				dispatch(new Send(sub))
			})
			patchState({subscriptions: []})
		}
	}

	@Action(WebsocketMessageError)
	private websocketMessageError(
		{payload}: WebsocketMessageError
	) {
		this.error.handle(payload)
		console.log('websocket message error')
	}
}
