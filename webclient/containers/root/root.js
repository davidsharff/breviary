'use strict';

const React = require('react');
const {Router, Route} = require('react-router');
const App = require('../app/app');
const CodingParameters = require('../coding-parameters/coding-parameters');
const history = require('../../history');

class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <div id="root">
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="test" component={CodingParameters} />
          </Route>
          <Route path="*" component={NotFound} />
        </Router>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Root;

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found :(</h1>
      </div>
    );
  }
}
