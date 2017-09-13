import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './propertyItem.less';

const PropertyItem = ({ ...props }) => {
  const hasHeader = false;
  const headerImgProp = 'https://d30y9cdsu7xlg0.cloudfront.net/png/7757-200.png';
  const imgStyle = {
    backgroundImage: `url(${headerImgProp})`,
    backgroundSize: hasHeader ? 'cover' : '60px 60px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  };
  return (
    <Col sm={6} className={styles.propertyContainer}>
      <Grid fluid className={styles.property}>
        <Row>
          <Col sm={12}>
            <div style={imgStyle} className={styles.img} />
          </Col>
        </Row>
        <Row className={styles.address}>
          <Col sm={12}>
            <h3>{props.address}</h3>
            <p>{props.city}, {props.state} {props.zipcode}</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <hr className={styles.hr} />
          </Col>
          <Col sm={12}>
            <p>Additional info here</p>
          </Col>
        </Row>
      </Grid>
    </Col>
  );
};

PropertyItem.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.number.isRequired
};

export default PropertyItem;
