import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import { getAuth, isLoggedIn } from '../selectors';
import LoginForm from '../components/account/LoginForm';

class LoginPage extends Component {
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
    this.props.login(email, password);
  }

  render() {
    const { isPosting } = this.props;
    return (
      <LoginForm onSubmit={this.submit} isPosting={isPosting} />
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...getAuth(state),
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(LoginPage);
