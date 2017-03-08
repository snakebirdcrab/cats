'use strict';

import xml2js from 'xml2js';

const REQUEST_CAT_FACTS = 'REQUEST_CAT_FACTS';
const RECEIVE_CAT_FACTS = 'RECEIVE_CAT_FACTS';
const REMOVE_CAT_FACT = 'REMOVE_CAT_FACT';
const max_facts = 25;

function receiveCatFacts(json) {
	return {
		type: RECEIVE_CAT_FACTS,
		facts: json//json.image
	}
}

function requestCatFacts() {
	return {
		type: REQUEST_CAT_FACTS
	}
}

export function removeCatFact(fact_id) {
	return {
		type: REMOVE_CAT_FACT,
		fact: fact_id
	}
}

var getCatPics = new Promise((resolve, reject) => {
	//const imgUrl = 'http://mapd-cats.azurewebsites.net/catpics';
	const imgUrl = 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC';

	fetch(imgUrl)
	.then(function(resp) {
		return resp.json();
	})
	.then(function(json) {
		resolve(json)

	})
	.catch(err => {
		reject('Sorry, no cat pics today.');
	});
})

var getCatText = new Promise((resolve, reject) => {
	const factsUrl = 'http://mapd-cats.azurewebsites.net/catfacts';

	fetch(factsUrl)
	.then(function(resp) {
		console.log(resp);
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

	return dispatch => {
		dispatch(requestCatFacts());
		return Promise.all([getCatText, getCatPics])
		.then(values => {
			let catFacts = [];
			// parse facts + images data and combine into one array
			for (let i = 0; i < max_facts; i++) {
				catFacts[i] = {
					text: values[0].facts[i],
					url: values[1].data[i].images.downsized.url,
					id: i
				};
			}

			dispatch(receiveCatFacts(catFacts));
		})
		.catch(err => {
			console.log(err);
		})
	}
}