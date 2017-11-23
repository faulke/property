import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './propertyItem.less';

const PropertyItem = ({ ...props }) => {
  const hasCoverImage = props.image !== null;
  const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/7757-200.png';
  const coverImage = hasCoverImage ? props.image : defaultImage;
  const imgStyle = {
    backgroundImage: `url(${coverImage})`,
    backgroundSize: hasCoverImage ? 'cover' : '60px 60px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  };
  return (
    <Link to={`/properties/${props.id}/payments`}>
      <Col md={6} className={styles.propertyContainer}>
        <Grid fluid className={styles.property}>
          <Row>
            <Col sm={12} className={styles.imgContainer}>
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
    </Link>
  );
};

PropertyItem.propTypes = {
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.number.isRequired,
  image: PropTypes.string
};

PropertyItem.defaultProps = {
  image: null
};

export default PropertyItem;
