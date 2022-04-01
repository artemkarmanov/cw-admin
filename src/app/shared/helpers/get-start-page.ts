import {environment} from "@env";

export function getStartPage(): string {
	return (environment.role !== 'admin') ? 'bookings' : 'sessions'
}
