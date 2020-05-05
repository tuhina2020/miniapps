export const onboardingBigQueryEvent = ({ Authorization, payload, dev }) => {
	const BASE_URL = dev ? 'https://apis.staging.sharechat.com' : 'https://apis.sharechat.com';
	return fetch(
		`${BASE_URL}/webcard-service/v1.0.0/sendOnboardingEventBQ`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization
			},
			body: JSON.stringify(payload)
		});
}