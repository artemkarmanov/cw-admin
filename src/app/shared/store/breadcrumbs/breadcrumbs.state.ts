import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import {ClearBreadcrumbs, SetBreadcrumbs} from "@store/breadcrumbs.actions";

interface CurrBreadcrumb {
    title: string
}

interface PrevBreadcrumb extends CurrBreadcrumb{
    path: string
}

export type Breadcrumbs = [PrevBreadcrumb, CurrBreadcrumb]

type BreadcrumbsStateModel = [PrevBreadcrumb, CurrBreadcrumb] | []

@State<BreadcrumbsStateModel>({name: 'breadcrumbs', defaults: []})
@Injectable()
export class BreadcrumbsState {
    @Action(SetBreadcrumbs)
    private createBreadcrumbs(
        {setState}: StateContext<BreadcrumbsStateModel>,
        {payload}: SetBreadcrumbs
    ) {
        return setState([...payload])
    }

    @Action(ClearBreadcrumbs)
    private clearBreadcrumbs(
        {setState}: StateContext<BreadcrumbsStateModel>,
    ) {
        return setState([])
    }
}
