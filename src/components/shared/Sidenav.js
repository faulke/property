import React from 'react';
import { Link } from 'react-router';
import { Sidenav, Nav, Icon } from 'rsuite';
import styles from './sidenav.less';

const NavLink = props => <Nav.Item componentClass={Link} {...props} />;

const Sidebar = () => (
  <Sidenav className={styles.sidebar}>
    <Sidenav.Body>
      <Nav>
        <NavLink 
          to="/properties"
          activeClassName={styles.active}
          icon={<Icon icon="home" />}
        >Properties</NavLink>
        <NavLink 
          to="/payments"
          activeClassName={styles.active}
          icon={<Icon icon="money" />}
        >Payments</NavLink>
        <NavLink 
          to="/listings"
          activeClassName={styles.active}
          icon={<Icon icon="map-signs" />}
        >Listings</NavLink>
        <NavLink 
          to="/applications"
          activeClassName={styles.active}
          icon={<Icon icon="file-text-o" />}
        >Applications</NavLink>
        <NavLink 
          to="/maintenance"
          activeClassName={styles.active}
          icon={<Icon icon="wrench" />}
        >Maintenance</NavLink>
        <NavLink 
          to="/reports"
          activeClassName={styles.active}
          icon={<Icon icon="line-chart" />}
        >Reports</NavLink>
        <NavLink 
          to="/settings"
          activeClassName={styles.active}
          icon={<Icon icon="cog" />}
        >Settings</NavLink>
      </Nav>
    </Sidenav.Body>
  </Sidenav>
);

export default Sidebar;