import user from './TemplateUserForm';
import acronyms from './TemplateAcronymForm';
import trendingTV from './TemplateTrendingTVChannels';
import onboarding from './TemplateOnboardingData';
import generic from './TemplateGenericData';
import covidzone from './TemplateCovidZone';
import { combineReducers } from 'redux'

const BASE_REDUCER = combineReducers({
	user,
	acronyms,
	trendingTV,
	onboarding,
	generic,
	covidzone
})

export default BASE_REDUCER;
