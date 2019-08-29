// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Footer } from 'rsuite';
import { getAuth } from '../selectors';
import * as actions from '../actions';
import Header from './shared/Header';
import styles from './emptyLayout.less';

class EmptyLayout extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          {this.props.children}
        </Content>
      </Container>
    );
  }
}

EmptyLayout.propTypes = {
  children: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...getAuth(state)
});

export default connect(mapStateToProps, actions)(EmptyLayout);
