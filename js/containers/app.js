'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCatFacts, removeCatFact } from '../actions';

//var insertCss = require('insert-css');
//insertCss(require('../../stylesheets/index.styl'));


class App extends Component {
	constructor(props) {
		super(props)
		this.onClickRemove = this.onClickRemove.bind(this);
	}

	renderHeader() {
		return (
			<div className="header">
				<div className="header-text">Cat Facts!</div>
			</div>
		)
	}

	renderCatFacts() {

		let factComponents = this.props.facts.map(fact => {
			return (
				<CatFact key={fact.id} fact={fact} callback={this.onClickRemove} />
			)
		})
		return factComponents;
	}

	onClickRemove(item) {
		const { dispatch } = this.props
		
		let removed = document.querySelector('[data-id="' + item.props.fact.id + '"]');
		
		function finishedHandler() {
			removed.remove();
		}

		let slide = removed.animate([
			{maxHeight: 0}
		], 400)
		.finished.then(finishedHandler)
		
		slide.onfinish = finishedHandler;
	}

	render() {
		return (
			<div>
			{this.renderHeader()}
			{this.renderCatFacts()}
			</div>
		)
	}
}

class CatFact extends Component {
	constructor(props) {
		super(props);
		this.onClickRemove = this.onClickRemove.bind(this);
	}

	render() {
		return (
			<div className="row" data-id={this.props.fact.id}>
				<div className="row-inner">
					<div className="img-box">
						<img className="cat-img" src={this.props.fact.url}/>
					</div>
					<div className="text-box">{this.props.fact.text}</div>
					<div className="close-button" onClick={this.onClickRemove}>X</div>
				</div>
			</div>
		)
	}

	onClickRemove() {
		this.props.callback(this);
	}
}

App.propTypes = {
	facts: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state = {catFacts, fetchStatus}) => ({
	facts: state.catFacts,
	isFetching: state.fetchStatus
});

export default connect(mapStateToProps)(App);

