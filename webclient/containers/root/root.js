'use strict';

const React = require('react');
const {connect} = require('react-redux');
const {Router, Route} = require('react-router');
const history = require('../../history');

@connect(() => ({
}))
class Root extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div id="root">
        <Router history={history}>
          <Route path="/" component={Main} />
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    );
  }
}

module.exports = Root;

class Main extends React.Component {
  render() {
    return (
      <div>
        Hello!
      </div>
    );
  }
}

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found :(</h1>
      </div>
    );
  }
}
