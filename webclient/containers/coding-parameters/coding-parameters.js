'use strict';

const React = require('react');
const {connect} = require('react-redux');
const autobind = require('autobind-decorator');

const localActionTypes = require('../../local-action-types');
const store = require('../../store');

const Modal = require('../../components/modal/modal');

const styles = require('./coding-parameters.scss');

@connect((state) => ({
  codingTypes: state.app.codingTypes,
  codingParameters: state.app.codingParameters
}))
@autobind
class CodingParameters extends React.Component {
  static propTypes = {
    codingTypes: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    codingParameters: React.PropTypes.arrayOf(
      React.PropTypes.object // TODO: update
    )
  }

  state = {
    pendingCodingType: '',
    pendingCodingLabel: ''
  }

  handleAddCodingLabel(e) {
    this.setState({
      pendingCodingLabel: e.target.value
    });
  }

  handleAddCodingType(e) {
    this.setState({
      pendingCodingType: e.target.value
    });
  }

  handleSubmitNewCodingParameter() {
    const type = this.state.pendingCodingType
      ? this.state.pendingCodingType
      : this.props.codingTypes[0];
    store.dispatch({
      type: localActionTypes.SUBMIT_NEW_CODING_PARAMETER,
      payload: {
        type,
        label: this.state.pendingCodingLabel
      }
    });

    this.setState({
      pendingCodingType: '',
      pendingCodingLabel: ''
    });
  }

  render() {
    return (
      <Modal>
        <div className={styles.container}>
          <div className={styles.title}>Coding Parameters</div>
          {
            this.props.codingParameters.map((cp, index) =>
              <div key={index} className={styles.codingParameter}>
                <div>{cp.type}</div>
                <div>{cp.label}</div>
              </div>
            )
          }
          <div className={styles.codingParameter}>
            <select value={this.state.pendingCodingType} onChange={this.handleAddCodingType}>
              {
                this.props.codingTypes.map((ct) =>
                  <option key={ct} value={ct}>{ct}</option>
                )
              }
            </select>
            <input
              type="text"
              defaultValue="coding label"
              value={this.state.pendingCodingLabel}
              onChange={this.handleAddCodingLabel}
            />
          </div>
          <button onClick={this.handleSubmitNewCodingParameter}>Submit</button>
        </div>
      </Modal>
    );
  }
}

module.exports = CodingParameters;