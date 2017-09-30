import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';

const FormInput = ({
  type,
  name,
  label,
  placeholder,
  input,
  className
}) => (
  <FormGroup controlId={name}>
    <Col componentClass={ControlLabel} sm={3}>
      {label}
    </Col>
    <Col sm={6}>
      <input type={type} className={className} placeholder={placeholder} {...input} />
    </Col>
  </FormGroup>
);

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  className: PropTypes.string
};

FormInput.defaultProps = {
  type: 'text',
  name: '',
  label: '',
  placeholder: '',
  className: ''
};

export default FormInput;
