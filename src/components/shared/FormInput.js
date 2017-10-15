import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './formInput.less';

const FormInput = ({
  type,
  name,
  label,
  hint,
  helpLink,
  placeholder,
  input,
  className,
  meta: { touched, error }
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
    {
      hint ?
        <span className={styles.formHint}>{hint}</span> :
        ''
    }
    <Col>
      <input type={type} className={className} placeholder={placeholder} {...input} />
      { (touched && error) ? <span className={styles.error}>{error}</span> : '' }
    </Col>
  </FormGroup>
);

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  helpLink: PropTypes.object,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired
};

FormInput.defaultProps = {
  type: 'text',
  name: '',
  label: '',
  hint: null,
  helpLink: null,
  placeholder: '',
  className: ''
};

export default FormInput;
