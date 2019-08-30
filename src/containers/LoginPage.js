import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import {
  FlexboxGrid,
  Panel
} from 'rsuite';
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
    const { isPosting, loginError } = this.props;
    return (
      <div>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12} style={{ textAlign: "center" }}>
            <h2>Sign in to Rental Swag</h2>
            <span>
              Don&apos;t have an account?
            </span>
            &nbsp;
            <Link
              to="/account/register"
            >Create one here</Link>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Login</h3>} bordered>
              <LoginForm
                onSubmit={this.submit} 
                isPosting={isPosting}
                loginError={loginError}
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  loginError: PropTypes.string
};

LoginPage.defaultProps = {
  loginError: null
};

const mapStateToProps = state => ({
  ...getAuth(state),
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(LoginPage);
