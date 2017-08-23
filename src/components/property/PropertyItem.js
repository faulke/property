import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PropertyItem = ({ ...props }) => (
  <h1>{props.address}</h1>
);

PropertyItem.propTypes = {
  address: PropTypes.string.isRequired
};

export default PropertyItem;
