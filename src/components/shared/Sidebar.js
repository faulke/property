import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import styles from './sidebar.less';

const Sidebar = ({ ...props }) => (
  <ul className={styles.navList}>
    <li className={styles.navItem}>
      <Link 
        to="/properties"
        className={styles.link}
        activeClassName={styles.active}
      >
        Properties
      </Link>
    </li>
    <li className={styles.navItem}>
      <Link 
        to="/2"
        className={styles.link}
        activeClassName={styles.active}
      >
        Page 2
      </Link>
    </li>
    <li className={styles.navItem}>
      <Link 
        to="/3"
        className={styles.link}
        activeClassName={styles.active}
      >
        Page 3
      </Link>
    </li>
    <li className={styles.navItem}>
      <Link 
        to="/4"
        className={styles.link}
        activeClassName={styles.active}
      >
        Page 4
      </Link>
    </li>
  </ul>
);

Sidebar.propTypes = {
};

Sidebar.defaultProps = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, actions)(Sidebar);