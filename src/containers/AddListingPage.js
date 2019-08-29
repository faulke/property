import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../components/shared/Loader';
import * as actions from '../actions';
import { addListing } from '../selectors';

class AddListingPage extends Component {
  componentDidMount() {
    const { id } = this.props.params;
  }

  render() {
    const { isFetching } = this.props;
    const { id } = this.props.params;

    return (
      isFetching ?
        <Loader /> :
        <div>
          <h1>Create listing for #{id}</h1>
        </div>
    );
  }
}

AddListingPage.propTypes = {
  params: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...addListing(state)
});

export default connect(mapStateToProps, actions)(AddListingPage);
