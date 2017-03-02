'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCatFacts } from '../actions';

//var insertCss = require('insert-css');
//insertCss(require('../../stylesheets/index.styl'));


class App extends Component {
	constructor(props) {
		super(props)
		console.log(props);
		//this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		//const { dispatch } = this.props
		//dispatch(getCatFacts());
	}

	renderCatFacts() {
		console.log(this.props);
		
		let factComponents = this.props.facts.map(fact => {
			return (
				<div key={fact.id[0]}>
					<img className="cat-img" src={fact.url[0]}/>
					<div>{fact.text}</div>
				</div>
			)
		})
		console.log(factComponents);
		return factComponents;
	}

	render() {
		return (
			<div>
			{this.renderCatFacts()}
			</div>
		)
	}

}

App.propTypes = {
	facts: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = (state = {catFacts, fetchStatus}) => ({
	facts: state.catFacts,
	isFetching: state.fetchStatus
});

export default connect(mapStateToProps)(App);

