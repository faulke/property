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

    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    const { name, clearLocalUser } = this.props;
    if (name) {
      clearLocalUser();
    }
  }

  submitForm(evt) {
    evt.preventDefault();
    const email = this.props.email;
    const password = this.props.password;
    this.props.register(email, password);
  }

  render() {
    const { email, password } = this.props;
    return (
      <div>
        <RegisterForm
          submitForm={this.submitForm}
          updateForm={this.updateInput}
          email={email}
          password={password}
        />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  register: React.PropTypes.func.isRequired,
  clearLocalUser: React.PropTypes.func.isRequired
};

RegisterPage.defaultProps = {
  email: '',
  password: '',
  name: null
};

const mapStateToProps = state => ({
  email: getAuth(state).email,
  password: getAuth(state).password,
  name: getAuth(state).name
});

export default connect(mapStateToProps, actions)(RegisterPage);
