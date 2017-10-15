import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import { getAuth, isLoggedIn } from '../selectors';
import RegisterForm from '../components/account/RegisterForm';
import styles from './login.less';

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
    this.props.register({ ...values });
  }

  render() {
    const { isPosting, registerError } = this.props;
    return (
      <Grid fluid>
        <Row className={styles.loginHeader}>
          <h1>Register</h1>
        </Row>
        <Row>
          <Col sm={4} smOffset={4} className={styles.loginContainer}>
            <RegisterForm 
              onSubmit={this.submit} 
              isPosting={isPosting} 
              registerError={registerError}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  registerError: PropTypes.string,
  isAuthed: PropTypes.bool.isRequired
};

RegisterPage.defaultProps = {
  registerError: null
};

const mapStateToProps = state => ({
  ...getAuth(state),
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(RegisterPage);
