const initialState = {
  acronymObj: {}
}

export default function acronymData(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACRONYMS_LIST':
      return Object.assign({}, state, {
        acronymObj: action.payload
			})
		default :
			return state;
	}
}