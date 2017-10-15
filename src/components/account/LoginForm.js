import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Col, Row, Button } from 'react-bootstrap';
import FormInput from '../shared/FormInput';
import styles from './forms.less';

const required = value => value ? undefined : 'Required';

const LoginForm = ({ handleSubmit, pristine, isPosting, loginError }) => (
  <Form horizontal className={styles.form} onSubmit={handleSubmit}>
    <Field
      type="email"
      name="email"
      label="Email"
      placeholder="Email"
      component={FormInput}
      className="form-control"
      validate={[required]}
    />
    <Field
      type="password"
      name="password"
      label="Password"
      helpLink={{ route: "/account/login", text: "Forgot?" }}
      placeholder="Password"
      component={FormInput}
      className="form-control"
      validate={[required]}
    />
    {
      loginError ?
        <p className={styles.error}>{loginError}</p> :
        ''
    }
    <FormGroup className={styles.formGroup}>
      <Col>
        <Button
          type="submit"
          bsStyle={"success"}
          className={styles.button}
          disabled={isPosting}
        >
          Sign in
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isPosting: PropTypes.bool.isRequired,
  loginError: PropTypes.string
};

LoginForm.defaultProps = {
  loginError: null
};

export default reduxForm({
  form: 'login'
})(LoginForm);
