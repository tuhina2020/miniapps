export const setUserName = (payload) => {
	console.log('SET USER NAME ', payload);
	return {
		type: 'SET_USER_NAME',
		payload
	}
};

export const toggleSharedState = () => {
	return {
		type: "TOGGLE_SHARED_STATUS"
	}
};
