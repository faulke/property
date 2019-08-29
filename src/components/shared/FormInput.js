import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'rsuite';
import { Link } from 'react-router';
import styles from './formInput.less';

const FormInput = ({
  id,
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
    <ControlLabel>{label}</ControlLabel>
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
    <FormControl
      id={id}
      type={type}
      className={className}
      placeholder={placeholder}
      {...input}
    />
    { (touched && error) ? <span className={styles.error}>{error}</span> : '' }
  </FormGroup>
);

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
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
