import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './propertyItem.less';

const PropertyItem = ({ ...props }) => (
  <Col sm={6} className={styles.propertyContainer}>
    <Grid fluid className={styles.property}>
      <Row className={styles.imgContainer}>
        <div className={styles.img}>
          Image here
        </div>
      </Row>
      <Row className={styles.address}>
        <Col sm={12}>
          <h3>{props.address}</h3>
          <p>{props.city}, {props.state} {props.zipcode}</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <hr />
        </Col>
        <Col sm={12}>
          Additional info here
        </Col>
      </Row>
    </Grid>
  </Col>
);

PropertyItem.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.number.isRequired
};

export default PropertyItem;
