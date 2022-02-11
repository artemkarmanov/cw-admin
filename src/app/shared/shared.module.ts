import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from './timezone-selector/timezone-selector.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ViewersListComponent} from './viewers-list/viewers-list.component';
import {RegionPipe} from './region.pipe';
import {CityPipe} from './city.pipe';


@NgModule({
    declarations: [
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TimezoneSelectorComponent,
        ViewersListComponent,
        RegionPipe,
        CityPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
