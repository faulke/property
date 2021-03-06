import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, ButtonToolbar, Button } from 'rsuite';
import FormInput from '../shared/FormInput';
import styles from './forms.less';

const required = value => value ? undefined : 'Required';
const match = (value, allValues) => value === allValues.password ?
  undefined :
  'Passwords do not match.';
const minLength = value => value.length >= 7 ?
  undefined :
  "Password must be at least 7 characters long.";

const uppercase = value => (/(?=.*[A-Z])/).test(value) ?
  undefined :
  "Password must contain at least 1 uppercase letter.";

const digit = value => (/(?=.*[0-9])/).test(value) ?
  undefined :
  "Password must contain at least 1 number.";

const special = value => (/(?=.*[!@#$%^&*)(])/).test(value) ?
  undefined :
  "Password must contain at least 1 special character.";

const passwordHint = `At least 7 characters
  in length and contains 1 uppercase letter,
  1 number, and 1 special character.`;

const RegisterForm = ({ handleSubmit, isPosting, registerError }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      id="firstName"
      type="text"
      name="firstName"
      label="First Name"
      placeholder="First"
      component={FormInput}
      className="form-control"
      validate={[required]}
    />
    <Field
      id="lastName"
      type="text"
      name="lastName"
      label="Last Name"
      placeholder="Last"
      component={FormInput}
      className="form-control"
      validate={[required]}
    />
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
      hint={passwordHint}
      placeholder="Password"
      component={FormInput}
      className="form-control"
      validate={[required, minLength, uppercase, digit, special]}
    />
    <Field
      id="confirmPassword"
      type="password"
      name="confirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      component={FormInput}
      className="form-control"
      validate={[required, match]}
    />
    {
      registerError ?
        <p className={styles.error}>{registerError}</p> :
        ''
    }
    <FormGroup className={styles.formGroup}>
      <ButtonToolbar>
        <Button
          appearance="primary"
          type="submit"
          disabled={isPosting}
          onClick={handleSubmit}
        >Register</Button>
      </ButtonToolbar>
    </FormGroup>
  </Form>
);

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  registerError: PropTypes.string
};

RegisterForm.defaultProps = {
  registerError: null
};

export default reduxForm({
  form: 'login'
})(RegisterForm);