import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PropertyDetailPage extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchPropertyDetails(id);
  }

  render() {
    return (
      <div>Property details</div>
    );
  }

}

PropertyDetailPage.propTypes = {
  params: PropTypes.object.isRequired
};

export default PropertyDetailPage;
