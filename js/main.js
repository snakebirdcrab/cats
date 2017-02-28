'use strict';

var wfetch = require('whatwg-fetch');
var xml2js = require('xml2js');

function getCatPics() {
	const imgUrl = 'http://mapd-cats.azurewebsites.net/catpics';
	
	fetch(imgUrl)
	.then(function(resp) {

		return resp.text();
	})
	.then(function(resp) {
		//console.log(resp);

		xml2js.parseString(resp, function(err, result) {
			//console.log(result);
			console.log(result.response.data[0].images[0]);
			return result.response.data[0].images[0];
		});
		
	})
	.catch(function(err) {
		throw 'Sorry, no cat pics today.';
	});
}

function getCatFacts() {
	const factsUrl = 'http://mapd-cats.azurewebsites.net/catfacts';

	fetch(factsUrl)
	.then(function(resp) {
		return resp.json();
	})
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		throw 'Sorry, no cat facts today.';
	});
}

getCatPics();
getCatFacts();
