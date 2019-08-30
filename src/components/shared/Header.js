import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, Nav, Dropdown, Icon, Popover, Whisper, Button } from 'rsuite';
import { browserHistory, Link } from 'react-router';
import { isLoggedIn, getAuth } from '../../selectors';
import * as actions from '../../actions';
import styles from './header.less';

const Speaker = ({ ...props }) => (
  <Popover title="Notifications" {...props}>
    <ul>
      <li>Notification 1</li>
      <li>Notification 2</li>
    </ul>
  </Popover>
);

const Notifications = () => (
  <Whisper
    trigger="click"
    placement="bottomRight"
    speaker={<Speaker />}
  >
    <Button appearance="primary" className={styles.notifications}>
      <Icon icon="bell-o" />  
    </Button>
  </Whisper>
);

const Header = ({ name, logout, isAuthed }) => (
  <Navbar appearance="inverse"> 
    <Navbar.Header>
      <Link
        to="/"
        className={styles.navBrand}
      >Rental Swag</Link>
    </Navbar.Header>
    <Navbar.Body>
      <Nav pullRight>
        {
          isAuthed ? (
            <div>
              <Nav.Item
                componentClass={Notifications}
              />
              <Dropdown id="user-dropdown" title={name}>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
              </Dropdown>
            </div>
          ) :
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
