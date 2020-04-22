import user from './TemplateUserForm';
import acronyms from './TemplateAcronymForm';
import trendingTV from './TemplateTrendingTVChannels';
import onboarding from './TemplateOnboardingData';
import { combineReducers } from 'redux'

const BASE_REDUCER = combineReducers({
	user,
	acronyms,
	trendingTV,
	onboarding
})

export default BASE_REDUCER;
