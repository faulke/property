// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isLoggedIn } from '../selectors';
import * as actions from '../actions';
import Header from './shared/Header';
import Sidebar from './shared/Sidebar';
import styles from './mainLayout.less';

class MainLayout extends Component {
  componentWillMount() {
    if (!this.props.isAuthed) {
      browserHistory.push('account/login');
    }
  }

  render() {
    return (
      <div className={styles.siteWrapper}>
        <Header />
        <div className={styles.main}>
          <aside className={styles.sidebar}>
            <Sidebar />
          </aside>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthed: React.PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(MainLayout);
