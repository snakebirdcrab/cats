'use strict';

import { combineReducers } from 'redux';
import { REMOVE_CAT_FACT, REQUEST_CAT_FACTS, RECEIVE_CAT_FACTS } from './actions';


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
			for (let fact of state) {
				if (fact.id === action.fact) {
					state.splice(state.indexOf(fact), 1);
					return state;
				}
			}
		case 'REQUEST_CAT_FACTS':
			return []
		case 'RECEIVE_CAT_FACTS':
			return action.facts
		default:
			return state
	}
}

let reducer = combineReducers({
	fetchStatus: fetchStatus,
	catFacts: allFacts
})

export default reducer;