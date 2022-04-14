export interface IEnvironment {
	production: boolean
	backend: string
	role: 'admin' | 'booking'
	viewerUrl: string
	stripe: {
		pk: string;
		complete: string
	}
}
