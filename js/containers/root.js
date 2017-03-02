import { App } from './app';
import { Provider } from 'react-redux';
var React = require('react');
var ReactDOM = require('react-dom');
var configureStore = require('../store');



const store = configureStore();
console.log(store);
console.log(App);

export class Root extends React.Component {

	render() {

		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

