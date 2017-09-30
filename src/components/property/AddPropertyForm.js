import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import FormInput from '../shared/FormInput';

const AddPropertyForm = ({ isPosting, handleSubmit, pristine }) => (
  <Form horizontal onSubmit={handleSubmit}>
    <Field
      type="text"
      name="address"
      label="Address"
      placeholder="Address"
      component={FormInput}
      className="form-control"
      required
    />
    <Field
      type="text"
      name="city"
      label="City"
      placeholder="City"
      component={FormInput}
      className="form-control"
      required
    />
    <Field
      type="text"
      name="state"
      label="State"
      placeholder="ST"
      component={FormInput}
      className="form-control"
      required
    />
    <Field
      type="text"
      name="zipcode"
      label="Zip code"
      placeholder="Zip code"
      component={FormInput}
      className="form-control"
      required
    />
    <Field
      type="text"
      name="rent"
      label="Rent"
      placeholder="Rent ($)"
      component={FormInput}
      className="form-control"
      required
    />
    <FormGroup>
      <Col smOffset={4} sm={4}>
        <Button type="submit" disabled={pristine || isPosting}>
          Add property
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

AddPropertyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isPosting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'addProperty'
})(AddPropertyForm);
