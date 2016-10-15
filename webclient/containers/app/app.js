'use strict';

const React = require('react');
const {Link} = require('react-router');

const styles = require('./app.scss');

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Breviary</h1>
          <Link to="/test">Update Coding Parameters</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

module.exports = App;