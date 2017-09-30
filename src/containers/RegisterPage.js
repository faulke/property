import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import { getAuth, isLoggedIn } from '../selectors';
import RegisterForm from '../components/account/RegisterForm';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthed, isPosting } = nextProps;
    if (isAuthed) {
      browserHistory.push('/properties');
    }
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
  register: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...getAuth(state),
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(RegisterPage);
