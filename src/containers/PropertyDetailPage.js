import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { propertyDetail } from '../selectors';

class PropertyDetailPage extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchPropertyDetail(id);
  }

  render() {
    return (
      <div>Property details</div>
    );
  }

}

PropertyDetailPage.propTypes = {
  params: PropTypes.object.isRequired,
  fetchPropertyDetail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...propertyDetail(state)
});

export default connect(mapStateToProps, actions)(PropertyDetailPage);
