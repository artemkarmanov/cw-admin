import {Pipe, PipeTransform} from '@angular/core';
import {IAdminUser} from '../../core/types';

@Pipe({
    name: 'role'
})
export class RolePipe implements PipeTransform {

    transform(user: IAdminUser): string {
        let result: string[] = [];
        if (user.isAdmin) result.push('admin');
        if (user.isCaptioner) result.push('captioner');

        return result.join(', ');
    }

}
