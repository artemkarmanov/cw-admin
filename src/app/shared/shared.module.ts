import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from './timezone-selector/timezone-selector.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ViewersListComponent} from './viewers-list/viewers-list.component';


@NgModule({
    declarations: [
        TimezoneSelectorComponent,
        ViewersListComponent
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TimezoneSelectorComponent,
        ViewersListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
