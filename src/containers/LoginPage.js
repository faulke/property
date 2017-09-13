import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import { getAuth } from '../selectors';
import LoginForm from '../components/account/LoginForm';

class LoginPage extends FormTemplate {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(evt) {
    evt.preventDefault();
    const { email, password } = this.props;
    this.props.login(email, password);
  }

  render() {
    const { email, password } = this.props;
    return (
      <LoginForm
        submitForm={this.submitForm}
        updateForm={this.updateInput}
        email={email}
        password={password}
      />
    );
  }
}

LoginPage.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  name: React.PropTypes.string,
  login: React.PropTypes.func.isRequired
};

LoginPage.defaultProps = {
  email: '',
  password: '',
  name: null
};

const mapStateToProps = state => ({
  ...getAuth(state)
});

export default connect(mapStateToProps, actions)(LoginPage);
