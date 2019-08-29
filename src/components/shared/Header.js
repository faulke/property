import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, Dropdown } from 'rsuite';
import { browserHistory, Link } from 'react-router';
import { isLoggedIn, getAuth } from '../../selectors';
import * as actions from '../../actions';
import styles from './header.less';

const Header = ({ name, logout, isAuthed }) => (
  <Navbar appearance="inverse"> 
    <Navbar.Header>
      <Link
        to="/"
        className="navbar-brand logo"
      >RentalSwag</Link>
    </Navbar.Header>
    <Navbar.Body>
      <Nav pullRight>
        {
          isAuthed ? 
            <Dropdown id="user-dropdown" title={name}>
              <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
            </Dropdown> :
            <Nav.Item 
              onClick={() => browserHistory.push('/account/login')}
            >Sign In</Nav.Item>
        }
      </Nav>
    </Navbar.Body>
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
