'use strict';

import { combineReducers } from 'redux';
import { REMOVE_CAT_FACT, REQUEST_CAT_FACTS, RECEIVE_CAT_FACTS } from './actions';


const removeFact = (state = {}, action) => {

	switch (action.type) {
		case 'REMOVE_CAT_FACT':
			return
		default:
			return state;
	}
};

const fetchStatus = (state = {}, action) => {
	switch (action.type) {
		case 'REQUEST_CAT_FACTS':
			return true
		case 'RECEIVE_CAT_FACTS':
			return false
		default:
			return state
	}
}

const allFacts = (state = {}, action) => {
	switch (action.type) {
		case 'REMOVE_CAT_FACT':
			return state.facts.slice(0, action.id)
		case 'REQUEST_CAT_FACTS':
			return []
		case 'RECEIVE_CAT_FACTS':
			return action.facts
		default:
			return state
	}
}

let reducer = combineReducers({
	//factRemoved: removeFact,
	fetchStatus: fetchStatus,
	catFacts: allFacts
})

export default reducer;