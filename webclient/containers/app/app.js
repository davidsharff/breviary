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
        <div className={styles.main}>
          <div className={styles.leftNav}>
          </div>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = App;