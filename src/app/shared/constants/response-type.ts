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
	GetBookingSummaryResponse = 'getBookingSummaryResp',
	GetBookingsResponse = 'getBookingsResp',
	GetSessionViewerLogsResponse = 'getSessionViewerLogsResp',
	GetSessionsSummaryResponse = 'getSessionsSummaryResp',
	GetSessionCaptionLogsResponse = 'getSessionCaptionLogsResp',
	CancelSessionResponse = 'cancelSessionResp',
	CreateBookingResponse = 'createBookingResp',
  UpdateBookingResponse = 'updateBookingResp',
	/** {} */
	UpdateUserResponse = 'updateUserResp',
	GetStripeClientSecretResponse = 'getStripeClientSecretResp',
	GetUsersResponse = 'getUsersResp',
	GetBillingResultsResponse = 'getBillingResultsResp',
	GetBillingDetailsResponse = 'getBillingDetailsResp'
}
