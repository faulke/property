import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import * as actions from '../actions';
import { propertyDetail } from '../selectors';
import s3Url from '../utils/s3Url';
import Loader from '../components/shared/Loader';
import PropertyDetailHeader from '../components/property/PropertyDetailHeader';
import styles from './propertyDetail.less';

class PropertyDetailPage extends Component {
  constructor(props) {
    super(props);

    this.handleTabSelect = this.handleTabSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchPropertyDetail(id);
  }

  handleTabSelect(key) {
    this.setState({ key });
  }

  render() {
    const { isFetching, details } = this.props;
    if (details === null) {
      return <Loader />;
    }

    return (
      isFetching ?
        <Loader /> :
        <Grid fluid style={{ flex: "auto" }}>
          <Row style={{ margin: "10px 0px 10px 0px" }}>
            <PropertyDetailHeader
              address={details.address}
              city={details.city}
              state={details.state}
              zipcode={details.zipcode}
              coverUrl={s3Url(details.files[0]) || null}
            />
          </Row>
          <Row>
            <Tabs
              activeKey={this.state.key} 
              onSelect={this.handleTabSelect}
              animation={false}
              id="property-detail-tabs"
            >
              <Tab eventKey={1} title="Payments">Payments</Tab>
              <Tab eventKey={2} title="Listing">Listing</Tab>
              <Tab eventKey={3} title="Applications">Applications</Tab>
            </Tabs>
          </Row>
        </Grid>
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
