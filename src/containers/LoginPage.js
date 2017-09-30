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

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { email, password } = values;
    this.props.login(email, password);
  }

  render() {
    const { email, password } = this.props;
    return (
      <LoginForm onSubmit={this.submit} />
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...getAuth(state)
});

export default connect(mapStateToProps, actions)(LoginPage);
