import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import FormInput from '../shared/FormInput';

const LoginForm = ({ handleSubmit, pristine, isPosting }) => (
  <Form horizontal onSubmit={handleSubmit}>
    <Field
      type="text"
      name="email"
      label="Email"
      placeholder="Email"
      component={FormInput}
      className="form-control"
      required
    />
    <Field
      type="password"
      name="password"
      label="Password"
      placeholder="Password"
      component={FormInput}
      className="form-control"
      required
    />
    <FormGroup>
      <Col smOffset={4} sm={4}>
        <Button type="submit" disabled={pristine || isPosting}>
          Sign in
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isPosting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'login'
})(LoginForm);
