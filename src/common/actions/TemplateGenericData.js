export const setGenericData = payload => {
	return {
		type: 'SET_GENERIC_DATA',
		payload
	}
}

export const setUsername = payload => {
	return {
		type: 'SET_NAME',
		payload
	}
}

export const toggleSharedState = () => {
	return {
		type: 'SET_SHARED_STATUS'
	}
}