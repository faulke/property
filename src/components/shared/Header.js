import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { isLoggedIn, getAuth } from '../../selectors';
import * as actions from '../../actions';
import styles from './header.less';

const Header = ({ ...props }) => (
  <Navbar inverse collapseOnSelect className={styles.navbarMb0}>
    <Navbar.Header>
      <Navbar.Brand>
        Logo here
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {
          props.isAuthed ? 
            <NavDropdown id="user-dropdown" title={props.name}>
              <MenuItem href="/account/login" onClick={props.clearLocalUser}>Log out</MenuItem>
            </NavDropdown> :
            <NavItem>Sign In</NavItem>
        }
        <NavItem className="visible-xs" href="/properties">Properties</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  name: React.PropTypes.string,
  isAuthed: React.PropTypes.bool.isRequired,
  clearLocalUser: React.PropTypes.func.isRequired
};

Header.defaultProps = {
  name: null
};

const mapStateToProps = state => ({
  name: getAuth(state).name,
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(Header);