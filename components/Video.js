'use strict';

import React from 'react';
import xmlParser from 'xml2json';

var Video = React.createClass({
	// Check if the iframe is included in the response. Convert the XML from traileraddict to useful JSON.
	getInitialState: function() {
		if (this.props.video.trailer.indexOf('iframe') > -1) {
			var xmlParserOptions = {
		  	sanitize: false
			},
			trailerIframeString,
			trailerIframeJSON;
			trailerIframeString = xmlParser.toJson(this.props.video.trailer, xmlParserOptions);
			trailerIframeJSON = JSON.parse(trailerIframeString);
			return {
        iframe: trailerIframeJSON.trailers.trailer.embed
      };
		} else {
			return {
        iframe: ""
      };
		}
	},

  render: function () {
    return (
			<div className="video">
				<div className="trailer" dangerouslySetInnerHTML={{__html: this.state.iframe}}/>
				<div className="meta-data">
					<div className="information">
		    		<h1 className="title">{this.props.video.title}</h1>
		    		<h2 className="sub-title">{this.props.video.production.year} | {this.props.video.duration} | {this.props.video.genres.join(', ')}</h2>
		    		<p>IMDB: {this.props.video.imdbData.rating} från {this.props.video.imdbData.votes}</p>
		    		<p>{this.props.video.synopsis}</p>
		    	</div>
	    		<div className="sub-information">
	    			<p>Skådespelare: {this.props.video.people.actors.join(', ')}</p>
	    			<p>Regissör: {this.props.video.people.directors.join(', ')}</p>
	    			<p>Land: {this.props.video.production.country}</p>
	    		</div>
	    	</div>
    	</div>
    );
  }
});

export default Video;
