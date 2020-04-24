const initialState = {
	displayObj: [],
	selectedTags: [],
	submitted: false 
}

export default function acronymData(state = initialState, action) {
  switch (action.type) {
    case 'SET_ONBOARDING_DATA':
      return Object.assign({}, state, {
        displayObj: action.payload
			})
		case 'SET_ONBOARDING_METADATA' :
			return Object.assign({}, state, {
				metadata: action.payload
			})
		case 'SET_GENRE_TAGS' :
			return Object.assign({}, state, {
				selectedTags: action.payload
			});
		case 'SET_TRANSITION' :
			return Object.assign({}, state, {
				submitted: action.payload
			});
		default :
			return state;
	}
}