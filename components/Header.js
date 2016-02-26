'use strict';

import React from 'react';

var Header = React.createClass({
  render: function () {
    return (
      <header>
      	<img className="header-logo" src="/logo.png" alt="Header logo"/>
      </header>
    );
  }
});

export default Header;
