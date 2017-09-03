import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';
import { getAuth } from '../selectors';

class Login extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  submitForm(evt) {
    evt.preventDefault();
    const email = this.props.email;
    const password = this.props.password;
    this.props.login(email, password);
  }

  updateInput(evt) {
    const { id, value } = evt.target;
    this.props.updateInput(id, value);
  }

  render() {
    const { email, password } = this.props;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input id="email" type="text" onChange={this.updateInput} value={email} />
          <input id="password" type="password" onChange={this.updateInput} value={password} />
          <button type="submit">Login</button>  
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  updateInput: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired
};

Login.defaultProps = {
  email: '',
  password: ''
};

const mapStateToProps = state => ({
  email: getAuth(state).email,
  password: getAuth(state).password
});

export default connect(mapStateToProps, actions)(Login);
