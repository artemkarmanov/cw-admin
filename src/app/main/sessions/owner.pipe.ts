import {Pipe, PipeTransform} from '@angular/core';
import {IAdminSession} from '../../core/types';

@Pipe({
    name: 'owner'
})
export class OwnerPipe implements PipeTransform {

    transform(session: IAdminSession): string {
        return [session.ownerFirstName, session.ownerLastName].join(' ');
    }

}
