import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Col } from 'react-bootstrap';
import * as actions from '../../actions';
import { fileUpload } from '../../selectors';
import styles from './fileupload.less';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.props.getPresignedUrl(files[0], this.props.uuid);
  }

  render() {
    const { name, label } = this.props;
    return (
      <FormGroup controlId={name} >
        <Col componentClass={ControlLabel}>
          {this.props.label}
        </Col>
        <Col>
          <Dropzone onDrop={this.onDrop} className={`${styles.fileupload}`}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </Col>
      </FormGroup>
    );
  }
}

FileUpload.propTypes = {
  getPresignedUrl: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  ...fileUpload(state)
});

export default connect(mapStateToProps, actions)(FileUpload);
