'use strict';

import React from 'react';
import Header from './Header';
import Video from './Video';
import Footer from './Footer';

var App = React.createClass({
  render: function () {
    return (
      <html lang="en">
      <head>
        <title>{this.props.video.title}</title>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div>
          <Header />
          <Video video={this.props.video}/>
          <Footer />
        </div>
      </body>
      </html>
    );
  }
});

export default App;
