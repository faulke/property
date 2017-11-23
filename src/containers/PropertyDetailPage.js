import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { browserHistory } from 'react-router';
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
    this.setRouteParam = this.setRouteParam.bind(this);

    this.state = {
      key: 1
    };
  }

  componentWillMount() {
    const { id, tab } = this.props.params;
    console.log('fetching property detail');
    this.props.fetchPropertyDetail(id);
    if (!tab) {
      this.setRouteParam('payments');
    } else {
      switch (tab) {
        case 'listing':
          this.setState({ key: 2 });
          break;
        case 'applications':
          this.setState({ key: 3 });
          break;
        default:
          this.setState({ key: 1 });
      }
      this.setRouteParam(tab);
    }
  }

  setRouteParam(tab) {
    const { id } = this.props.params;
    browserHistory.replace(`/properties/${id}/${tab}`);
    console.log(`/api/${tab}/${id}`);
    /* this.props.fetchPropertyDetail(tab)
        -- this will fetch api route based on tab
        -- i.e., /api/{tab}/{id}
        -- e.g., /api/payments/155
        -- potentially cache these results for certain amount of time?
    */
  }

  handleTabSelect(key) {
    let tab = null;
    switch (key) {
      case 1:
        tab = 'payments';
        break;
      case 2:
        tab = 'listing';
        break;
      case 3:
        tab = 'applications';
        break;
      default:
        tab = 'payments';
    }
    this.setState({ key });
    this.setRouteParam(tab);
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
            <Col lg={1} mdHidden />
            <Col lg={10}>
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
            </Col>
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
