'use strict';

const React = require('react');
const styles = require('./modal.scss');
class Modal extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };
  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Modal;