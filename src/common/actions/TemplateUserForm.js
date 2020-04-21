export const setPlaceHolder = payload => {
	return {
		type: "SET_PLACEHOLDER",
		payload
	}
};

export const setButtonText = payload => {
	return {
		type: "SET_BUTTON_TEXT",
		payload
	}
};

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

export const setText3 = (payload) => {
	return {
		type: 'SET_TEXT_3',
		payload
	}
}
export const setTagId = (payload) => {
	return {
		type: 'SET_TAG_ID',
		payload
	}
}

export const setTagName = (payload) => {
	return {
		type: 'SET_TAG_NAME',
		payload
	}
}

export const setNamePos = (payload) => {
	return {
		type: 'SET_NAME_POS',
		payload
	}
}
