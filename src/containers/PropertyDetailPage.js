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
    if (this.props.details === null) {
      return (<Loader />);
    }

    const { address, city, state, zipcode, rent, files } = this.props.details;
    return (
      <div>
        <div>{address}</div>
        <div>{city}</div>
        <div>{state}</div>
        <div>{zipcode}</div>
        <div>{rent}</div>
        {
          files.map((x, i) => {
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
  details: PropTypes.object
};

PropertyDetailPage.defaultProps = {
  details: null
};

const mapStateToProps = state => ({
  ...propertyDetail(state)
});

export default connect(mapStateToProps, actions)(PropertyDetailPage);
