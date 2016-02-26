'use strict';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from 'node-fetch';
import serveStatic from 'serve-static';
import _ from 'lodash';
import AppComponent from './components/App';

var app = express(),
	endpoints = {
		content: {
			url: 'https://content.viaplay.se',
			filter: '?partial=true&block=1'
		},
		trailer : {
			url: 'http://api.traileraddict.com/?imdb=',
			filter: '&count=1'
		}
	},
	AppHtml,
	imdbID,
	formattedData;

app.set('port', process.env.PORT || 8080 );

// Server all content in the public folder from the root.
app.use(serveStatic(__dirname + '/public'));

// Fetch content data based on the url. Format the data to match what we need in the view. Render.
app.use((req, res) => {
	fetchContentAndTrailerData(req.url).then(function(videoData) {
		formattedData = formatData(videoData);
		AppHtml = ReactDOMServer.renderToStaticMarkup(<AppComponent video={formattedData}/>);
		res.send(AppHtml);
	});
});

// Fetch content data and then fetch trailer data. Remove the occurens of tt in IMDB id.
function fetchContentAndTrailerData (reqUrl) {
	return fetch(endpoints.content.url + reqUrl + endpoints.content.filter).then(function (res) {
		return res.json();
	}).then(function(contentData) {
		imdbID = contentData._embedded['viaplay:product'].content.imdb.id.replace('tt', '');
		return fetch(endpoints.trailer.url + imdbID + endpoints.trailer.filter).then(function (res) {
			return res.text();
		}).then(function (trailerData) {
			return {
				trailer: trailerData,
				content: contentData
			}
		})
	});
}

function formatData (data) {
	return {
		trailer: data.trailer,
		title: data.content._embedded['viaplay:product'].content.title,
		production: data.content._embedded['viaplay:product'].content.production,
		genres: _.map(data.content._embedded['viaplay:product']._links['viaplay:genres'], "title"),
		duration: data.content._embedded['viaplay:product'].content.duration.readable,
		imdbData: data.content._embedded['viaplay:product'].content.imdb,
		synopsis: data.content._embedded['viaplay:product'].content.synopsis,
		people: data.content._embedded['viaplay:product'].content.people
	}
}

app.listen(app.get('port'), () => {
	console.log('Listening on port: ' + app.get('port') + '...' );
});
