import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import { getAuth, isLoggedIn } from '../selectors';
import LoginForm from '../components/account/LoginForm';
import styles from './login.less';

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
      <Grid fluid>
        <Row className={styles.loginHeader}>
          <h1>Sign in</h1>
          <p>Need an account? <Link to="/account/register">Register.</Link></p>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} className={styles.loginContainer}>
            <LoginForm
              onSubmit={this.submit} 
              isPosting={isPosting}
              loginError={loginError}
            />
          </Col>
        </Row>
      </Grid>
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
