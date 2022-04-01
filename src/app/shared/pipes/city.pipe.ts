import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'city'
})
export class CityPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return 'Unknown';
        return value
            .replace('_', ' ')
            .split('/')
            .pop() as string;
    }

}
