import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Form, FormControl, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import uuid from 'uuid/v4';
import FormInput from '../shared/FormInput';
import FileUpload from '../shared/FileUpload';
import styles from './addPropertyForm.less';

const storageKey = uuid();

const AddPropertyForm = ({ files, isPosting, isUploading, handleSubmit, pristine }) => (
  <Form className={styles.form} horizontal onSubmit={handleSubmit}>
    <Row>
      <Col sm={6}>
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
        <FormGroup className={styles.formGroup}>
          <Col>
            <Button 
              className={styles.button} 
              type="submit" 
              disabled={pristine || isPosting || isUploading}
            >
              Add property
            </Button>
          </Col>
        </FormGroup>
      </Col>
      <Col sm={6}>
        <Field
          name="files"
          component={FileUpload}
          files={files}
          isUploading={isUploading}
          uuid={storageKey}
        />
        <Field
          component="input"
          type="hidden" 
          name="storageKey"
        />
      </Col>
    </Row>
  </Form>
);

AddPropertyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isPosting: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired
};

export default reduxForm({
  form: 'addProperty',
  initialValues: {
    storageKey
  }
})(AddPropertyForm);
