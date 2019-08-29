import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Sidenav, Nav, Icon } from 'rsuite';
import * as actions from '../../actions';
import styles from './sidenav.less';

const NavLink = props => <Nav.Item componentClass={Link} {...props} />;

const Sidebar = ({ ...props }) => (
  <Sidenav className={styles.sidebar}>
    <Sidenav.Body>
      <Nav>
        <NavLink 
          to="/properties"
          icon={<Icon icon="home" />}
        >Properties</NavLink>
        <NavLink 
          to="/payments"
          icon={<Icon icon="money" />}
        >Payments</NavLink>
        <NavLink 
          to="/listings"
          icon={<Icon icon="map-signs" />}
        >Listings</NavLink>
        <NavLink 
          to="/applications"
          icon={<Icon icon="file-text-o" />}
        >Applications</NavLink>
        <NavLink 
          to="/maintenance"
          icon={<Icon icon="wrench" />}
        >Maintenance</NavLink>
        <NavLink 
          to="/reports"
          icon={<Icon icon="line-chart" />}
        >Reports</NavLink>
        <NavLink 
          to="/settings"
          icon={<Icon icon="cog" />}
        >Settings</NavLink>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

Sidebar.propTypes = {
};

Sidebar.defaultProps = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, actions)(Sidebar);