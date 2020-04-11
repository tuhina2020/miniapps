const initialState = {
  shared: false,
  username: ""
}

export default function username(state = initialState, action) {
	console.log('SET USER NAME ', action);
  switch (action.type) {
    case 'SET_USER_NAME':
      return Object.assign({}, state, {
        username: action.payload
			})
		case 'TOGGLE_SHARED_STATUS' : 
			return Object.assign({}, state, {
				shared: !state.share
			})
    default:
      return state
  }
}