import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'region'
})
export class RegionPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return 'Unknown';
        return value.split('/').shift() as string;
    }

}
