import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default function configureStore() {
	return createStore(
				reducer,
				compose(
					applyMiddleware(
						thunkMiddleware
					)
				)
			)
}