import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-bootstrap';
import * as actions from '../actions/index';
import { getProperties } from '../selectors';
import PropertyItem from '../components/property/PropertyItem';
import Loader from '../components/shared/Loader';
import PageHeader from '../components/shared/PageHeader';
import styles from './properties.less';
import s3Url from '../utils/s3Url';

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
    const { isFetching, properties } = this.props;
    return (
      <Grid fluid style={{ flex: "auto" }}>
        <PageHeader
          title={"Properties"}
          btnStyle={`btn btn-success ${styles.addProperty}`}
          btnLink={"properties/add"}
          btnTitle={"Add property"}
        />
        <Row className={styles.propertyRow}>
          { 
            isFetching ? 
              <Loader /> :
                properties.map((x) => {
                  const image = s3Url(x);
                  return (
                    <PropertyItem
                      key={x.id}
                      id={x.id}
                      address={x.address}
                      city={x.city}
                      state={x.state}
                      zipcode={x.zipcode}
                      image={image}
                    />
                  );
                })
          }
        </Row>
      </Grid>
    );
  }
}

Properties.propTypes = {
  isFetching: PropTypes.bool.isRequired,
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
