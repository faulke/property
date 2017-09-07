import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

const AddPropertyForm = ({ address, city, state, zipcode, rent, updateForm, submitForm }) => (
  <Form horizontal onSubmit={submitForm}>
    <FormGroup controlId="address">
      <Col componentClass={ControlLabel} sm={3}>
        Address
      </Col>
      <Col sm={6}>
        <FormControl
          type="text" 
          name="address"
          placeholder="Address" 
          value={address} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup controlId="city">
      <Col componentClass={ControlLabel} sm={3}>
        City
      </Col>
      <Col sm={6}>
        <FormControl
          type="text" 
          name="city"
          placeholder="City" 
          value={city} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup controlId="state">
      <Col componentClass={ControlLabel} sm={3}>
        State
      </Col>
      <Col sm={6}>
        <FormControl
          type="text" 
          name="state"
          placeholder="State" 
          value={state} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup controlId="zipcode">
      <Col componentClass={ControlLabel} sm={3}>
        Zip code
      </Col>
      <Col sm={6}>
        <FormControl
          type="text" 
          name="zipcode"
          placeholder="Zip code" 
          value={zipcode} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup controlId="rent">
      <Col componentClass={ControlLabel} sm={3}>
        Rent
      </Col>
      <Col sm={6}>
        <FormControl
          type="text" 
          name="rent"
          placeholder="Rent ($)" 
          value={rent} 
          onChange={updateForm} 
        />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={3} sm={6}>
        <Button type="submit">
          Add property
        </Button>
      </Col>
    </FormGroup>
  </Form>
);

AddPropertyForm.propTypes = {
  address: React.PropTypes.string,
  city: React.PropTypes.string,
  state: React.PropTypes.string,
  zipcode: React.PropTypes.string,
  rent: React.PropTypes.string,
  updateForm: React.PropTypes.func.isRequired,
  submitForm: React.PropTypes.func.isRequired
};

AddPropertyForm.defaultProps = {
  address: '',
  city: '',
  state: '',
  zipcode: '',
  rent: '',
};

export default AddPropertyForm;