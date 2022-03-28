export interface IBackFromStripe {
	setup_intent: string,
	setup_intent_client_secret: string,
	redirect_status: "succeeded" | "anything"
}
