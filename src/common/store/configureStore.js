import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import logger from 'redux-logger';

export default function configureStore () {
	const middlewares = [];
	// if (process.env.NODE_ENV === `DEVELOPMENT`) {
		const { logger } = require(`redux-logger`);
	
		middlewares.push(logger);
	// }
	
	const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);
  return store;
}