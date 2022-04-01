export interface IBilling {
	billingResultId: number
	totalBill: number
	success: 0 | 1
	error: string
	billedAtEpoch: number
	firstName: string
	lastName: string
	email: string
	userId: number
}

export interface IBillingDetails extends Array<{
	billingDetailsId: number
	sessionId: number
	sessionBill: number
	billedDuration: number
	bookedDuration: number
	rate: number
}> {
}
