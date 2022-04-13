import {MessageType} from '@constants/message-types'

export class Send {
	static readonly type = '[WebSocket] Send'

	constructor(public payload: {type: MessageType; data?: any}) {}
}
