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
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          <Panel header={<h3>Login</h3>} bordered>
            <LoginForm
              onSubmit={this.submit} 
              isPosting={isPosting}
              loginError={loginError}
            />
            {/* <Form fluid>
              <FormGroup>
                <ControlLabel>Username or email address</ControlLabel>
                <FormControl name="name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary">Sign in</Button>
                  <Button appearance="link">Forgot password?</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form> */}
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      // <Grid fluid>
      //   <Row className={styles.loginHeader}>
      //     <h1>Sign in</h1>
      //     <p>Need an account? <Link to="/account/register">Register.</Link></p>
      //   </Row>
      //   <Row>
      //     <Col sm={4} smOffset={4} className={styles.loginContainer}>

      //     </Col>
      //   </Row>
      // </Grid>
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
