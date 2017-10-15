import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './formInput.less';

const FormInput = ({
  type,
  name,
  label,
  helpLink,
  placeholder,
  input,
  className
}) => (
  <FormGroup controlId={name} className={styles.formGroup}>
    <Col componentClass={ControlLabel}>
      {label}
    </Col>
    {
      helpLink ?
        <Link className={styles.helpLink} to={helpLink.route}>{helpLink.text}</Link> :
        ''
    }
    <Col>
      <input type={type} className={className} placeholder={placeholder} {...input} />
    </Col>
  </FormGroup>
);

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  helpLink: PropTypes.object,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  className: PropTypes.string
};

FormInput.defaultProps = {
  type: 'text',
  name: '',
  label: '',
  helpLink: null,
  placeholder: '',
  className: ''
};

export default FormInput;
