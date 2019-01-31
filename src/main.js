"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, function (Handler) { // Add Router.HistoryLocation as second param for HTML 5 URLs
	React.render(<Handler />, document.getElementById('app'));
});