// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './shared/Header';

class EmptyLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

EmptyLayout.propTypes = {
  children: PropTypes.object.isRequired
};

export default EmptyLayout;
