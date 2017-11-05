import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { fileUpload } from '../../selectors';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    console.log(this.props);
    this.props.getPresignedUrl(files[0]);
  }

  render() {
    return (
      <div className="dropzone">
        <Dropzone onDrop={this.onDrop}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
      </div>
    );
  }
}

FileUpload.propTypes = {
  getPresignedUrl: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...fileUpload(state)
});

export default connect(mapStateToProps, actions)(FileUpload);
