// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getAuth } from '../selectors';
import * as actions from '../actions';
import Header from './shared/Header';

class EmptyLayout extends Component {
  componentWillMount() {
    this.props.logout();
  }

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
  children: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...getAuth(state)
});

export default connect(mapStateToProps, actions)(EmptyLayout);
