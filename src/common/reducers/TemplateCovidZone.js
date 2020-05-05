const initialState = {
	data: {},
	metadata: {},
	shared: false,
	username: "",
	states: [],
	filteredData: [],
	selected: {},
	focussed: false
}

export default function acronymData(state = initialState, action) {
  switch (action.type) {
    case 'SET_COVID_DATA':
      return Object.assign({}, state, {
        data: action.payload
			})
		case 'SET_COVID_METADATA':
			return Object.assign({}, state, {
				metadata: action.payload
			})
		case 'SET_COVID_STATES_METADATA' :
			return Object.assign({}, state, {
				states: action.payload
			})
		case 'SET_USERNAME':
			return Object.assign({}, state, {
				username: action.payload
			})
		case 'SET_COVID_SHARED_STATUS' : 
			return Object.assign({}, state, {
				shared: !state.shared
			})
		case 'SET_FOCUSSED_STATUS' : 
			return Object.assign({}, state, {
				focussed: !state.focussed
			})
		case 'SET_SEARCH_FILTERED_DATA' :
			return Object.assign({}, state, {
				filteredData: action.payload
			})
		case 'SET_SELECTED_DISTRICT' :
				return Object.assign({}, state, {
					selected: action.payload
				})
		default :
			return state;
	}
}