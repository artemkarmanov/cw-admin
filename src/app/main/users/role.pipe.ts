import {Pipe, PipeTransform} from '@angular/core';
import {IUser} from "@interfaces/user.interfaces";

@Pipe({name: 'role'})
export class RolePipe implements PipeTransform {
    transform(user: IUser): string {
        let result: string[] = [];
        if (user.isAdmin) result.push('admin');
        if (user.isCaptioner) result.push('captioner');

        return result.join(', ');
    }
}
