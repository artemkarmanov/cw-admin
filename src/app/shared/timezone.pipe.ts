import {Pipe, PipeTransform} from '@angular/core';
import { getUTCOffset } from '../core/utils';

@Pipe({
    name: 'timezone'
})
export class TimezonePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return 'Unknown';
        return `(UTC${getUTCOffset(value)})`;
    }

}
