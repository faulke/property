import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const Sidebar = ({ ...props }) => (
  <menu>
    <li>
      <Link to="/properties">Properties</Link>
    </li>
    <li>
      <Link to="/properties/add">Add Property</Link>
    </li>
  </menu>
);

Sidebar.propTypes = {
};

Sidebar.defaultProps = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, actions)(Sidebar);