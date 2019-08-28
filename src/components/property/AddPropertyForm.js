import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Form, FormGroup, Row, Col, Button } from 'react-bootstrap';
import FormInput from '../shared/FormInput';
import MapsAutocomplete from '../shared/MapsAutocomplete';
import FileUpload from '../shared/FileUpload';
import styles from './addPropertyForm.less';

const getComponentForm = () => ({
  street_number: {
    name: 'short_name',
    field: 'address1',
    combine: 'route',
    value: null
  },
  route: {
    name: 'long_name',
    field: 'address1',
    combine: 'street_number',
    value: null
  },
  locality: {
    name: 'long_name',
    field: 'city',
    value: null
  },
  administrative_area_level_1: {
    name: 'short_name',
    field: 'state',
    value: null
  },
  postal_code: {
    name: 'short_name',
    field: 'zipcode',
    value: null
  }
});

const onPlaceChanged = (place, change) => {
  const form = getComponentForm();
  place.address_components.forEach((comp) => {
    const type = comp.types[0];
    if (form[type]) {
      const newVal = comp[form[type].name];
      const { field, combine } = form[type];
      let value;

      if (combine) {
        const otherVal = form[combine].value;
        value = otherVal ? `${otherVal} ${newVal}` : newVal;
      } else {
        value = newVal;
      }

      form[type].value = value;
      change(field, value);
    }
  });
};

const AddPropertyForm = ({
  files, 
  isPosting, 
  isUploading, 
  handleSubmit, 
  pristine, 
  storageKey,
  change
}) => (
  <Form className={styles.form} horizontal onSubmit={handleSubmit}>
    <Row>
      <Col sm={6} smOffset={3}>
        <Field
          type="text"
          name="search"
          label="Search for address"
          placeholder="123 Cherry Lane..."
          component={MapsAutocomplete}
          className="form-control"
          onPlaceChanged={place => onPlaceChanged(place, change)}
        />
      </Col>
    </Row>
    <Row>
      <Col sm={6} smOffset={3}>
        <Field
          type="text"
          name="address1"
          label="Address line 1"
          placeholder="Address line 1"
          component={FormInput}
          className="form-control"
          required
        />
        <Field
          type="text"
          name="address2"
          label="Address line 2"
          placeholder="Address line 2"
          component={FormInput}
          className="form-control"
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
      </Col>
    </Row>
    <Row style={{ marginBottom: "75px" }}>
      <Col sm={12} md={6} mdOffset={3}>
        <Field
          name="files"
          label="Add a cover image"
          component={FileUpload}
          files={files}
          isUploading={isUploading}
          uuid={storageKey}
          multiple={false}
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
    </Row>
  </Form>
);

AddPropertyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isPosting: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  storageKey: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'addProperty'
})(AddPropertyForm);
