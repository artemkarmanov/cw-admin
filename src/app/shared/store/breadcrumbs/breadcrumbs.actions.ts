import {Breadcrumbs} from "@store/breadcrumbs.state";

export class SetBreadcrumbs {
    static readonly type = '[Breadcrumbs] Create'

    constructor(public payload: Breadcrumbs) {}
}

export class ClearBreadcrumbs {
    static readonly type = '[Breadcrumbs] Clear'
}
