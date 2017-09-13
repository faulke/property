import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import FormTemplate from './shared/FormTemplate';
import * as actions from '../actions/index';
import AddPropertyForm from '../components/property/AddPropertyForm';
import { createProperty } from '../selectors';

class AddPropertyPage extends FormTemplate {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(evt) {
    evt.preventDefault();
    const { address, city, state, zipcode, rent } = this.props;
    this.props.createProperty(address, city, state, zipcode, rent);
  }

  render() {
    const { address, city, state, zipcode, rent } = this.props;
    return (
      <Grid fluid style={{ flex: "auto" }}>
        <Row>
          <Col sm={12}>
            <AddPropertyForm
              submitForm={this.submitForm}
              updateForm={this.updateInput}
              address={address}
              city={city}
              state={state}
              zipcode={zipcode}
              rent={rent}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

AddPropertyPage.propTypes = {
  createProperty: React.PropTypes.func.isRequired
};

AddPropertyPage.defaultProps = {
  address: '',
  city: '',
  state: '',
  zipcode: '',
  rent: ''
};

const mapStateToProps = state => ({
  ...createProperty(state)
});

export default connect(mapStateToProps, actions)(AddPropertyPage);
