import {IBooking, ISession} from './types';
import {DateTime} from 'luxon';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {environment} from '../../environments/environment';

export function getFutureSessions(booking: IBooking): ISession[] | undefined {
    const now = DateTime.now();
    const sessions = Array.from(booking.sessions);

    const result = sessions.filter(session => {
        return DateTime.fromMillis(session.startEpoch) > now;
    });
    return result;
}

export function findNextSession(booking: IBooking): ISession | undefined {
    const sessions = getFutureSessions(booking);
    if (!sessions) {
        return undefined;
    } else {
        sessions.sort((a, b) => {
            return b.startEpoch - a.startEpoch;
        });
        return sessions.shift();
    }

}

// We suppose that FormGroup has password and password2 fields
export function checkPasswords(): ValidatorFn {
    return (_: AbstractControl): ValidationErrors | null => {
        const form: FormGroup = _ as FormGroup;
        if (form.get('password')?.value === form.get('password2')?.value) return null;
        return {
            passwordsDiffers: true
        }
    };
}

export function getStartPage(): string {
    return (environment.role !== 'admin') ? 'bookings' : 'sessions'
}
