import user from './TemplateUserForm';
import acronyms from './TemplateAcronymForm';
import trendingTV from './TemplateTrendingTVChannels';
import { combineReducers } from 'redux'

const BASE_REDUCER = combineReducers({
	user,
	acronyms,
	trendingTV
})

export default BASE_REDUCER;
