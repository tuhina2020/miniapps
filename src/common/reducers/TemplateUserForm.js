const initialState = {
  shared: false,
	username: "",
	text1: "",
	text2: "",
	text3: "",
	language: "",
	tagId: "",
	tagName: "",
	namePosition: ""
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
			case 'SET_TEXT_3':
				return Object.assign({}, state, {
					text3: action.payload
				})
		case 'SET_LANGUAGE':
			return Object.assign({}, state, {
				language: action.payload
			})
		case 'SET_TAG_ID':
			return Object.assign({}, state, {
				tagId: action.payload
			})
		case 'SET_TAG_NAME':
			return Object.assign({}, state, {
				tagName: action.payload
			})
		case 'SET_NAME_POS':
			return Object.assign({}, state, {
				namePosition: action.payload
			})
		case 'TOGGLE_SHARED_STATUS' : 
			return Object.assign({}, state, {
				shared: !state.shared
			})
    default:
      return state
  }
}