import {IEnvironment} from "../environment.interface";

export const environment: IEnvironment = {
	production: false,
	backend: 'ws://localhost:3000/socket',
	role: 'viewer',
	viewerUrl: 'https://testweb.captionworks.com:9000/session',
	stripe: {
		pk: 'pk_test_51KPQdVBu2Bri9BWB90KzZlGYbCQJbyZBVg424UdvQqiU9Qf9IKLHxfnhtgX7U7ZoSH9ZCqjBpFZLAl3y4m96EiZt00v0gMVUQP',
		complete: 'https://testweb.captionworks.com:8083/account-settings'
	}
};
