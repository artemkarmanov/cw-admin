import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IRegions} from "@interfaces/user.interfaces";
import {Send} from "@store/websocket.send.actions";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {MessageType} from "@constants/message-types";
import {Select} from "@ngxs/store";
import {UserState} from "@store/user.state";

@Injectable({providedIn: 'root'})
export class TimezoneService {
    @Select(UserState.regions) private regions$$!: Observable<IRegions>

    @Dispatch()
    public getRegions$() {
        return new Send({
            type: MessageType.GetTimeZoneRegions
        })
    }

    @Dispatch()
    public getCities$(regionId: number) {
        return new Send({
            type: MessageType.GetTimeZoneCities,
            data: {regionId}
        })
    }
}
