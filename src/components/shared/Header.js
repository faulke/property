import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { isLoggedIn, getAuth } from '../../selectors';
import * as actions from '../../actions';
import styles from './header.less';

const Header = ({ name, logout, isAuthed }) => (
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
          isAuthed ? 
            <NavDropdown id="user-dropdown" title={name}>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </NavDropdown> :
            <NavItem 
              onClick={() => browserHistory.push('/account/login')}
            >Sign In</NavItem>
        }
        {
          isAuthed ?
            <NavItem 
              className="visible-xs"
              onClick={() => browserHistory.push('properties')}
            >Properties</NavItem> :
            ''
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  name: React.PropTypes.string,
  isAuthed: React.PropTypes.bool.isRequired,
  logout: PropTypes.func
};

Header.defaultProps = {
  name: null,
  logout: null
};

const mapStateToProps = state => ({
  name: getAuth(state).name,
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(Header);
