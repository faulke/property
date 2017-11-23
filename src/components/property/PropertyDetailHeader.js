import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './propertyDetailHeader.less';

const PropertyDetailHeader = ({ address, city, state, zipcode, coverUrl }) => {
  const hasCoverImage = coverUrl !== null;
  const coverImage = coverUrl || 'https://d30y9cdsu7xlg0.cloudfront.net/png/7757-200.png';
  return (
    <div>
      <Col sm={1} mdHidden />
      <Col lg={10} md={12} sm={12} className={styles.headerContainer}>
        <div
          className={styles.coverImg}
          style={{ 
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: hasCoverImage ? 'cover' : '60px 60px',
          }}
        />
        <div className={styles.address}>
          <h2>{address}</h2>
          <div>{city}, {state} {zipcode}</div>
        </div>
        <div className={styles.backButton}>
          <Link to={"/properties"} className={"btn btn-default"}>
            <div><i className={styles.arrowLeft} /> All properties</div>
          </Link>
        </div>
      </Col>
    </div>
  );
};

PropertyDetailHeader.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.number.isRequired,
  coverUrl: PropTypes.string
};

PropertyDetailHeader.defaultProps = {
  coverUrl: null
};

export default PropertyDetailHeader;