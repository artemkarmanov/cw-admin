export enum ResponseType {
	/** { loginToken } */
	NewUserResponse = 'newUserResp',
	/** { loginToken, connectionId, role } */
	LogInResponse = 'loginResp',
	/** { loginToken, connectionId, role } */
	ReLogInResponse = 'reLoginResp',
	/** { } */
	LogOutResponse = 'logoutResp',
	/** { timeZone } */
	GetUserSettingsResponse = 'getUserSettingsResp',
	/** { } */
	StartResetPasswordResponse = 'startResetPasswordResp',
	/** { } */
	CheckResetPasswordResponse = 'checkResetPasswordResp',
	/** { } */
	ChangePasswordResponse = 'changePasswordResp',
	/** { regions: [{ regionId, region }] }*/
	GetTimeZoneRegionsResponse = 'getTimeZoneRegionsResp',
	/** { regionId, cities: [ <string> ]}*/
	GetTimeZoneCitiesResponse = 'getTimeZoneCitiesResp',
	/** { title, startEpoch, sessionDurationMins, sessionLive, sessionCaptioning, connectedCaptioners: [ userId ], autoCaptioningAvailable } */
	GetSessionStatusResponse = 'getSessionStatusResp',
	GetBookingSummaryResponse = 'getBookingSummaryResp',
	GetBookingsResponse = 'getBookingsResp',
}
