const initialState = {
	data: {},
	metadata: {},
	shared: false,
	username: "",
	states: [],
	filteredData: [],
	selected: {}
}

export default function acronymData(state = initialState, action) {
  switch (action.type) {
    case 'SET_GENERIC_DATA':
      return Object.assign({}, state, {
        data: action.payload
			})
		case 'SET_NAME':
			return Object.assign({}, state, {
				username: action.payload
			})
		case 'SET_SHARED_STATUS' : 
			return Object.assign({}, state, {
				shared: !state.shared
			})
		default :
			return state;
	}
}