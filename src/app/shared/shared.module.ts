import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimezoneSelectorComponent} from './timezone-selector/timezone-selector.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        TimezoneSelectorComponent
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        TimezoneSelectorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
