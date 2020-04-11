export const setUserName = (payload) => {
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

export const setText1 = (payload) => {
	return {
		type: 'SET_TEXT_1',
		payload
	}
}

export const setText2 = (payload) => {
	return {
		type: 'SET_TEXT_2',
		payload
	}
}

export const setLanguage = (payload) => {
	return {
		type: 'SET_LANGUAGE',
		payload
	}
}
