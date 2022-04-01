import {DateTime} from "luxon";

export function getUTCOffset(zone: string): string {
	const zoneDate = DateTime.utc().setZone(zone);
	const sign = zoneDate.offset < 0 ? '-' : '+';
	return sign + zoneDate.toISOTime().split(sign)[1];
}
