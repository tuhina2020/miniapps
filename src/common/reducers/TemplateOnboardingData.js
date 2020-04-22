const initialState = {
  displayObj: []
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
		default :
			return state;
	}
}