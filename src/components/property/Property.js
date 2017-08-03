import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import querystring from 'query-string';
import * as actions from '../../actions/index';
import { getProperties } from '../../selectors';

class Property extends Component {
  componentWillMount() {
    const query = this.props.location.query;
    this.props.fetchProperties({ ...query });
  }

  componentDidUpdate(nextProps) {
    const newQuery = nextProps.location.query;
    if (this.props.location.query !== newQuery) {
      this.props.fetchProperties({ ...newQuery });
    }
  }

  render() {
    const { properties } = this.props;
    if (!properties.length) return false;
    return (
      <div>
        {
          properties.map(x => (
            <h2 key={x.id}>{x.address} {x.city}, {x.state} {x.zipcode}</h2>
          ))
        }
      </div>
    );
  }
}

Property.propTypes = {
  fetchProperties: PropTypes.func.isRequired,
  properties: PropTypes.array.isRequired,
  location: PropTypes.object
};

Property.defaultProps = {
  location: {}
};

const mapStateToProps = state => ({
  properties: getProperties(state)
});

export default connect(mapStateToProps, actions)(Property);
