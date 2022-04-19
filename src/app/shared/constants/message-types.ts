export enum MessageType {
	/** { email, password, timeZone*, captioner-session* } */
	NewUser = 'newUser',
	/** { email, password, captioner-session } */
	LogIn = 'login',
	/** { loginToken } */
	ReLogIn = 'reLogin',
	/** { } */
	LogOut = 'logout',
	/** { } */
	GetUserSettings = 'getUserSettings',
	/** { } */
	UpdateUser = 'updateUser',
	GetUsers = 'getUsers',
	GetStripeClientSecret = 'getStripeClientSecret',
	/** { email } */
	StartResetPassword = 'startResetPassword',
	/** { email, passwordChangeToken } */
	CheckResetPassword = 'checkResetPassword',
	/** { email, changePasswordToken, password } */
	ChangePassword = 'changePassword',
	/** { } */
	GetTimeZoneRegions = 'getTimeZoneRegions',
	/** { regionId } */
	GetTimeZoneCities = 'getTimeZoneCities',
	UpdateSession = 'updateSession',
	CancelSession = 'cancelSession',
	AddSession = 'addSession',

	GetBookings = 'getBookings',
	GetBookingSummary = 'getBookingSummary',
	UpdateBooking = 'updateBooking',

	GetBillingResults = 'getBillingResults',
	GetBillingDetails = 'getBillingDetails',
	CreateBooking = 'createBooking',
	GetSessionCaptionLogs = 'getSessionCaptionLogs',
	GetSessionViewerLogs = 'getSessionViewerLogs',
	GetSessionsSummary = 'getSessionsSummary',
}
