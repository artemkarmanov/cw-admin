export interface IEnvironment {
	production: boolean
	backend: string
	role: 'admin' | 'viewer'
	viewerUrl: string
	stripe: {
		pk: string;
		complete: string
	}
}
