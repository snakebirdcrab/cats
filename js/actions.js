'use strict';

import xml2js from 'xml2js';

const REQUEST_CAT_FACTS = 'REQUEST_CAT_FACTS';
const RECEIVE_CAT_FACTS = 'RECEIVE_CAT_FACTS';
const REMOVE_CAT_FACT = 'REMOVE_CAT_FACT';

function receiveCatFacts(json) {
	return {
		type: RECEIVE_CAT_FACTS,
		facts: json.image
	}
}

function requestCatFacts() {
	return {
		type: REQUEST_CAT_FACTS
	}
}

function removeCatFact(fact_id) {
	return {
		type: REMOVE_CAT_FACT,
		fact: fact_id
	}
}

var getCatPics = new Promise((resolve, reject) => {
	const imgUrl = 'http://mapd-cats.azurewebsites.net/catpics';
	
	fetch(imgUrl)
	.then(function(resp) {
		return resp.text();
	})
	.then(function(resp) {
		xml2js.parseString(resp, function(err, result) {
			resolve(result.response.data[0].images[0]);
		});
	})
	.catch(err => {
		reject('Sorry, no cat pics today.');
	});
})

var getCatText = new Promise((resolve, reject) => {
	const factsUrl = 'http://mapd-cats.azurewebsites.net/catfacts';

	fetch(factsUrl)
	.then(function(resp) {
		return resp.json();
	})
	.then(function(json) {		
		resolve(json);
	})
	.catch(err => {
		reject('Sorry, no cat facts today.');
	});
});


export function getCatFacts() {
	console.log('getting cat facts');

	return dispatch => {
		dispatch(requestCatFacts());
		return Promise.all([getCatText, getCatPics])
		.then(values => {
			// add text to each cat fact
			for (let [i, pic] of values[1].image.entries()) {
				pic.text = values[0].facts[i];
			}
			dispatch(receiveCatFacts(values[1]));
		})
		.catch(err => {
			console.log(err);
		})
	}
}