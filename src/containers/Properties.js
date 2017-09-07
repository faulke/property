import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import querystring from 'query-string';
import { Grid, Row } from 'react-bootstrap';
import * as actions from '../actions/index';
import { getProperties } from '../selectors';
import PropertyItem from '../components/property/PropertyItem';
import styles from './properties.less';

class Properties extends Component {
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
        <Grid fluid>
          <Link to="/properties/add">Add property</Link>
          <Row className={styles.propertyRow}>
            {
              properties.map(x => (
                <PropertyItem
                  key={x.id} 
                  address={x.address}
                  city={x.city}
                  state={x.state}
                  zipcode={x.zipcode} 
                />
              ))
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

Properties.propTypes = {
  fetchProperties: PropTypes.func.isRequired,
  properties: PropTypes.array.isRequired,
  location: PropTypes.object
};

Properties.defaultProps = {
  location: {}
};

const mapStateToProps = state => ({
  properties: getProperties(state)
});

export default connect(mapStateToProps, actions)(Properties);
