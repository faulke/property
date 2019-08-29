// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Sidebar, Content, Footer } from 'rsuite';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { isLoggedIn, getAuth } from '../selectors';
import * as actions from '../actions';
import Header from './shared/Header';
import Sidenav from './shared/Sidenav';
import styles from './mainLayout.less';

class MainLayout extends Component {
  componentWillMount() {
    if (!this.props.isAuthed) {
      browserHistory.push('/account/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuthed) {
      browserHistory.push('/account/login');
    }
  }

  render() {
    return (
      <Container>
        <Header logout={this.props.logout} />
        <Container>
          <Sidebar className={styles.sidebar}>
            <Sidenav />
          </Sidebar>
          <Content className={styles.content}>
            {this.props.children}
          </Content>
        </Container>
        <Footer />
      </Container>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthed: isLoggedIn(state),
  ...getAuth(state)
});

export default connect(mapStateToProps, actions)(MainLayout);
