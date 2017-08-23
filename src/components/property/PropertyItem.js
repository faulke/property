import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './propertyItem.less';

const PropertyItem = ({ ...props }) => (
  <h1 className={styles.property}>{props.address}</h1>
);

PropertyItem.propTypes = {
  address: PropTypes.string.isRequired
};

export default PropertyItem;
