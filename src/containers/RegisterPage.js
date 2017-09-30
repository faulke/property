import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import { getAuth } from '../selectors';
import RegisterForm from '../components/account/RegisterForm';

class RegisterPage extends FormTemplate {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { email, password } = values;
    this.props.register(email, password);
  }

  render() {
    const { email, password } = this.props;
    return (
      <RegisterForm onSubmit={this.submit} />
    );
  }
}

RegisterPage.propTypes = {
  register: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...getAuth(state)
});

export default connect(mapStateToProps, actions)(RegisterPage);
