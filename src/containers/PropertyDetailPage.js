import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { propertyDetail } from '../selectors';
import s3Url from '../utils/s3Url';
import Loader from '../components/shared/Loader';

class PropertyDetailPage extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchPropertyDetail(id);
  }

  render() {
    const { isFetching, details } = this.props;
    if (details === null) {
      return <Loader />;
    }

    return (
      isFetching ?
        <Loader /> :
        <div>
          <div>{details.address}</div>
          <div>{details.city}</div>
          <div>{details.state}</div>
          <div>{details.zipcode}</div>
          <div>{details.rent}</div>
          {
            details.files.map((x, i) => {
              const url = s3Url(x);
              return (
                <img alt="property" key={i} src={url} style={{ height: '100px', width: '100px' }} />
              );
            })
          }
        </div>
    );
  }

}

PropertyDetailPage.propTypes = {
  params: PropTypes.object.isRequired,
  fetchPropertyDetail: PropTypes.func.isRequired,
  details: PropTypes.object,
  isFetching: PropTypes.bool.isRequired
};

PropertyDetailPage.defaultProps = {
  details: null
};

const mapStateToProps = state => ({
  ...propertyDetail(state)
});

export default connect(mapStateToProps, actions)(PropertyDetailPage);
