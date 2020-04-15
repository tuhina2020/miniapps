import user from './TemplateUserForm';
import acronyms from './TemplateAcronymForm';
import { combineReducers } from 'redux'

const BASE_REDUCER = combineReducers({
	user,
	acronyms
})

export default BASE_REDUCER;
