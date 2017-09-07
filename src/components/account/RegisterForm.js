import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

const RegisterForm = ({ submitForm, updateForm, email, password }) => (
  <Form horizontal onSubmit={submitForm}>
    <FormGroup controlId="email">
      <Col componentClass={ControlLabel} sm={3}>
        Email
      </Col>
      <Col sm={6}>
        <FormControl
          type="text" 
          name="email"
          placeholder="Email" 
          value={email} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup controlId="password">
      <Col componentClass={ControlLabel} sm={3}>
        Password
      </Col>
      <Col sm={6}>
        <FormControl
          type="password" 
          name="password"
          placeholder="Password" 
          value={password} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={3} sm={6}>
        <Button type="submit">
          Register
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

RegisterForm.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  updateForm: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired
};

RegisterForm.defaultProps = {
  email: '',
  password: ''
};

export default RegisterForm;