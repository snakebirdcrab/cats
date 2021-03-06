'use strict';

import App from './containers/app';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import { getCatFacts } from './actions';


const store = configureStore();

store.dispatch(getCatFacts());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('main-container')
)


