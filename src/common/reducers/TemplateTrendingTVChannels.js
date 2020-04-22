const initialState = {
	tvChannels: {},
	metadata: {}
}

export default function tvChannelData(state = initialState, action) {
  switch (action.type) {
    case 'SET_TV_CHANNELS':
      return Object.assign({}, state, {
        tvChannels: action.payload
			})
		case 'SET_METADATA' :
			return Object.assign({}, state, {
        metadata: action.payload
			})
		default :
			return state;
	}
}