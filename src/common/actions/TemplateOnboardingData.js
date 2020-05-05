export const setOnboardingDisplayData = payload => {
	return {
		type: 'SET_ONBOARDING_DATA',
		payload
	}
}

export const setOnboardingMetaData = payload => {
	return {
		type: 'SET_ONBOARDING_METADATA',
		payload
	}
}

export const setSelectedTags = payload => {
	return {
		type: 'SET_GENRE_TAGS',
		payload
	}
}

export const setSelectedGenres = payload => {
	return {
		type: 'SET_GENRES',
		payload
	}
}

export const setTransition = payload => {
	return {
		type: 'SET_TRANSITION',
		payload
	}
}