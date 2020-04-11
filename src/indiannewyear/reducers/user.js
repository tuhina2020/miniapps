const initialState = {
  shared: false,
	username: "",
	text1: "",
	text2: "",
	language: ""
}

export default function username(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_NAME':
      return Object.assign({}, state, {
        username: action.payload
			})
		case 'SET_TEXT_1':
			return Object.assign({}, state, {
				text1: action.payload
			})
		case 'SET_TEXT_2':
			return Object.assign({}, state, {
				text2: action.payload
			})
		case 'SET_LANGUAGE':
			return Object.assign({}, state, {
				language: action.payload
			})
		case 'TOGGLE_SHARED_STATUS' : 
			return Object.assign({}, state, {
				shared: !state.share
			})
    default:
      return state
  }
}