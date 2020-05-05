export const setGenericData = payload => {
	return {
		type: 'SET_COVID_DATA',
		payload
	}
}

export const setUsername = payload => {
	return {
		type: 'SET_USERNAME',
		payload
	}
}

export const toggleSharedState = () => {
	return {
		type: 'SET_COVID_SHARED_STATUS'
	}
}

export const setGenericMetaData = (payload) => {
	return {
		type: 'SET_COVID_METADATA',
		payload
	}
}

export const setGenericStatesMetaData = (payload) => {
	return {
		type: 'SET_COVID_STATES_METADATA',
		payload
	}
}

export const setFilteredData = payload => {
	return {
		type: 'SET_SEARCH_FILTERED_DATA',
		payload
	}
}

export const setSelectedCity = payload => {
	return {
		type: 'SET_SELECTED_DISTRICT',
		payload
	}
}

export const setFocus = payload => {
	return {
		type: 'SET_FOCUSSED_STATUS'
	}
}