import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Tabs, Tab, Modal } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
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
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      key: 1
    };
  }

  componentWillMount() {
    const { id, tab } = this.props.params;
    this.props.fetchPropertyDetail(id);
    if (!tab) {
      this.setRouteParam('listing');
    } else {
      switch (tab) {
        case 'listing':
          this.setState({ key: 1 });
          break;
        case 'applications':
          this.setState({ key: 2 });
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
        tab = 'listing';
        break;
      case 2:
        tab = 'applications';
        break;
      default:
        tab = 'listing';
    }
    this.setState({ key });
    this.setRouteParam(tab);
  }

  closeModal() {
    this.props.closeModal();
  }

  render() {
    const { isFetching, details, showModal } = this.props;
    const { id } = this.props.params;

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
              coverUrl={details.files.length ? s3Url(details.files[0]) : 'https://d30y9cdsu7xlg0.cloudfront.net/png/7757-200.png'}
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
                <Tab eventKey={1} title="Listing">Listing</Tab>
                <Tab eventKey={2} title="Applications">Applications</Tab>
              </Tabs>
            </Col>
          </Row>
          <Modal show={showModal} onHide={this.closeModal}>
            <Modal.Header closeButton />
            <Modal.Body>
              <Grid fluid style={{ flex: "auto" }}>
                <Row style={{ textAlign: "center" }}>
                  <h1>Success!  You just added {details.address}.</h1>
                </Row>
                <Row style={{ textAlign: "center" }}>
                  <h3>What would you like to do next?</h3>
                </Row>
                <Row>
                  <Col xs={6} style={{ textAlign: "center" }}>
                    <p>Find tenants</p>
                    <Link to="/listings/add">Create a listing</Link>
                  </Col>
                  <Col xs={6} style={{ textAlign: "center" }}>
                    <p>Collect rent</p>
                    <Link to={`/lease/${id}/new`}>Set up your lease</Link>
                  </Col>
                </Row>
                <Row>
                  <hr />
                </Row>
                <Row style={{ textAlign: "center" }}>
                  <Link to="/properties/add">Add another property</Link>
                </Row>
              </Grid>
            </Modal.Body>
          </Modal>
        </Grid>
    );
  }
}

PropertyDetailPage.propTypes = {
  params: PropTypes.object.isRequired,
  fetchPropertyDetail: PropTypes.func.isRequired,
  details: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

PropertyDetailPage.defaultProps = {
  details: null
};

const mapStateToProps = state => ({
  ...propertyDetail(state)
});

export default connect(mapStateToProps, actions)(PropertyDetailPage);
