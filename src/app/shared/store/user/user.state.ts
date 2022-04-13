import {Injectable} from '@angular/core'
import {MessageType} from '@constants/message-types'
import {Navigate} from '@ngxs/router-plugin'
import {Action, Actions, ofActionSuccessful, Selector, State, StateContext} from '@ngxs/store'
import {
	GetStripeClientSecretResponse,
	GetUserSettings,
	Login,
	Logout,
	Relogin
} from './user.actions'
import {
	ChangePasswordResponse,
	CheckResetPasswordResponse,
	GetTimeZoneCitiesResponse,
	GetTimeZoneRegionsResponse,
	GetUserSettingsResponse,
	LogInResponse,
	LogOutResponse,
	NewUserResponse,
	ReLogInResponse,
	StartResetPasswordResponse
} from '@store/websocket.response.actions'
import {Send} from '@store/websocket.send.actions'
import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {IRegion, IUserSettings} from "@interfaces/user.interfaces";
import {ErrorHandlerService} from "@services/error-handler.service";

export interface UserStateModel {
	logged?: boolean
	anonymous?: boolean
	loginToken?: string
	userInfo?: IUserSettings
	requestedPasscode?: boolean
	regions?: IRegion[]
	cities?: string[]
	stripeClientSecret?: string
}

const freshUser = {
	logged: false,
	anonymous: false,
	userInfo: undefined
}

@State<UserStateModel>({name: 'user', defaults: freshUser})
@Injectable()
export class UserState {
	constructor(
		private error: ErrorHandlerService,
		private actions: Actions
	) {
	}

	@Selector()
	public static userId(state: UserStateModel) {
		return state.userInfo?.userId
	}

	@Selector()
	public static userInfo(state: UserStateModel) {
		return state.userInfo
	}

	@Selector()
	public static userTimeZone(state: UserStateModel) {
		return state.userInfo?.timeZone
	}

	@Selector()
	public static anonymous(state: UserStateModel) {
		return state.anonymous
	}

	@Selector()
	public static requestedPasscode(state: UserStateModel): boolean | undefined {
		return state.requestedPasscode
	}

	@Selector()
	public static token(state: UserStateModel) {
		return state.loginToken
	}

	@Selector()
	public static logged(state: UserStateModel) {
		return state.logged
	}

	@Selector()
	public static regions(state: UserStateModel) {
		return state.regions
	}

	@Selector()
	public static cities(state: UserStateModel) {
		return state.cities
	}

	@Selector()
	public static stripeClientSecret(state: UserStateModel) {
		return state.stripeClientSecret
	}

	@Action(NewUserResponse)
	private newUser(
		{dispatch, patchState, getState, setState}: StateContext<UserStateModel>,
		{data, code, error}: NewUserResponse
	) {
		if (code === 200) {
			dispatch(new GetUserSettings())
			dispatch(new Navigate(['/']))

			return patchState({...data})
		} else {
			setState({...getState(), ...freshUser, loginToken: undefined})

			this.snack(error!)
			return getState()
		}
	}

	@Action(Login)
	private login(
		{dispatch}: StateContext<UserStateModel>,
		{payload}: Login
	): Observable<void> {
		return dispatch(new Send({type: MessageType.LogIn, data: {...payload}}))
	}

	@Action(LogInResponse)
	private logInResponse(
		{getState, setState, dispatch}: StateContext<UserStateModel>,
		{data, code, error}: LogInResponse
	): UserStateModel {
		if (code !== 200) {
			this.snack(error!)
			return getState()
		}
		dispatch(new GetUserSettings())

		return setState({...getState(), ...data})
	}

	@Action(GetUserSettings)
	private getUserSettings(
		{dispatch}: StateContext<UserStateModel>
	): Observable<UserStateModel> {
		return dispatch(new Send({type: MessageType.GetUserSettings})).pipe(
			switchMap(() =>
				this.actions.pipe(ofActionSuccessful(GetUserSettingsResponse))
			)
		)
	}

	@Action(GetUserSettingsResponse)
	private getUserSettingsResponse(
		{getState, setState}: StateContext<UserStateModel>,
		{data}: GetUserSettingsResponse
	): UserStateModel {
		return setState({...getState(), userInfo: data, logged: true})
	}

	@Action(Relogin)
	private relogin(
		{getState, dispatch, setState}: StateContext<UserStateModel>
	) {
		const {loginToken, logged} = getState()

		if (loginToken) {
			return dispatch(
				new Send({type: MessageType.ReLogIn, data: {loginToken}})
			)
		}

		if (logged) {
			return getState()
		}

		return of(setState({...getState()})).pipe(
			switchMap(() => dispatch(new Navigate(['/'])))
		)
	}

	@Action(ReLogInResponse)
	private reloginResponse(
		{getState, setState, dispatch}: StateContext<UserStateModel>,
		{data, code, error}: ReLogInResponse
	) {
		if (code === 200) {
			setState({...getState(), ...data, logged: true})

			return dispatch(new GetUserSettings())
		} else {
			setState({...getState(), ...freshUser, loginToken: undefined})

			this.snack(error!)

			return dispatch(new Navigate(['/']))
		}
	}

	@Action(Logout)
	private logout({dispatch}: StateContext<UserStateModel>) {
		return dispatch(new Send({type: MessageType.LogOut}))
	}

	@Action(LogOutResponse)
	private logOutResponse({getState, setState}: StateContext<UserStateModel>) {
		return setState({...getState(), ...freshUser, loginToken: undefined})
	}

	@Action(GetTimeZoneRegionsResponse)
	private GetTimeZoneRegionsResponse(
		{getState, setState}: StateContext<UserStateModel>,
		{data}: GetTimeZoneRegionsResponse
	) {
		return setState({...getState(), regions: data.regions})
	}

	@Action(GetTimeZoneCitiesResponse)
	private getTimeZoneCitiesResponse(
		{getState, setState}: StateContext<UserStateModel>,
		{data}: GetTimeZoneCitiesResponse
	) {
		return setState({...getState(), cities: data.cities})
	}

	@Action(StartResetPasswordResponse)
	private startResetPasswordResponse(
		{}: StateContext<UserStateModel>,
		{code, error}: StartResetPasswordResponse
	) {
		this.snack(code === 200
			? 'We just have sent you an email!'
			: error || 'Something gone wrong...')
	}

	@Action(CheckResetPasswordResponse)
	private checkResetPasswordResponse(
		{}: StateContext<UserStateModel>,
		{code, error}: CheckResetPasswordResponse
	) {
		if (code !== 200 && error) {
			this.snack(error)
		}
	}

	@Action(ChangePasswordResponse)
	private changePasswordResponse(
		{dispatch}: StateContext<UserStateModel>,
		{code, error}: ChangePasswordResponse
	) {
		if (code !== 200 && error) {
			return this.snack(error)
		}
		return dispatch(new Navigate(['/']))
	}

	@Action(GetStripeClientSecretResponse)
	private getStripeClientSecretResponse(
		{patchState}: StateContext<UserStateModel>,
		{data}: GetStripeClientSecretResponse
	) {
		console.log()
		return patchState({stripeClientSecret: data.stripeClientSecret})
	}

	private snack(error: string) {
		this.error.handle(error)
	}
}
