import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from '../actions/index';
import AddPropertyForm from '../components/property/AddPropertyForm';
import { createProperty } from '../selectors';
import styles from './properties.less';

class AddPropertyPage extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.createProperty(values);
  }

  render() {
    const { isPosting } = this.props;
    return (
      <Grid fluid style={{ flex: "auto" }}>
        <Row className={styles.pageHeader}>
          <Col xs={7}>
            <h1 className={styles.headerTitle}>Add Property</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <AddPropertyForm isPosting={isPosting} onSubmit={this.submit} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

AddPropertyPage.propTypes = {
  createProperty: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...createProperty(state)
});

export default connect(mapStateToProps, actions)(AddPropertyPage);
