// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './shared/Header';
import Sidebar from './shared/Sidebar';
import styles from './mainLayout.less';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid fluid>
          <Row className={styles.main}>
            <Col sm={2} className={styles.sidebar}>
              <Sidebar />
            </Col>
            <Col sm={10} className={styles.content}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default MainLayout;
