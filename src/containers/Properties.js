import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import querystring from 'query-string';
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from '../actions/index';
import { getProperties } from '../selectors';
import PropertyItem from '../components/property/PropertyItem';
import Sidebar from '../components/shared/Sidebar';
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
    return (
      <div>
        <Grid fluid>
          <Row className={styles.pageHeader}>
            <Col sm={9}>
              <h1 className={styles.headerTitle}>Properties</h1>
            </Col>
            <Col sm={3} className={styles.headerRight}>
              <Link to="/properties/add" className={`btn btn-medium ${styles.addProperty}`}>Add property</Link>
            </Col>
          </Row>
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
  ...getProperties(state)
});

export default connect(mapStateToProps, actions)(Properties);
