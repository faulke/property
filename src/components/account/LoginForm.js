import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
  ControlLabel
} from 'rsuite';
import FormInput from '../shared/FormInput';
import styles from './forms.less';

const required = value => value ? undefined : 'Required';

const LoginForm = ({ handleSubmit, isPosting, loginError }) => (
  <Form fluid>
    <Field
      id="email"
      type="email"
      name="email"
      label="Email"
      placeholder="Email"
      component={FormInput}
      className="form-control"
      validate={[required]}
    />
    <Field
      id="password"
      type="password"
      name="password"
      label="Password"
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
      <ButtonToolbar>
        <Button
          appearance="primary"
          type="submit"
          disabled={isPosting}
          onClick={handleSubmit}
        >Sign in</Button>
        <Button appearance="link">Forgot password?</Button>
      </ButtonToolbar>
    </FormGroup>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  loginError: PropTypes.string
};

LoginForm.defaultProps = {
  loginError: null
};

export default reduxForm({
  form: 'login'
})(LoginForm);
