import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import * as actions from '../../actions';
import { fileUpload } from '../../selectors';
import styles from './fileupload.less';
import FileLoader from '../shared/FileLoader';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    files.forEach(file => this.props.getPresignedUrl(file, this.props.uuid));
  }

  render() {
    const { files, isUploading, input } = this.props;
    return (
      <FormGroup controlId={name}>
        <Col>
          <Dropzone 
            onDrop={this.onDrop}
            name={input.name} 
            className={`${styles.fileupload}`}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <Row className={styles.fileRow}>
              {
                files.map((file, i) => (
                  <div 
                    key={i}
                    className={styles.filePreview}
                    name={file.name}
                    data-index={i}
                    style={{
                      backgroundImage: `url(${file.preview})`,
                      opacity: isUploading ? "0.3" : "1"
                    }}
                  >
                    { isUploading ? <FileLoader /> : '' }
                  </div>
                ))
              }
            </Row>
          </Dropzone>
        </Col>
      </FormGroup>
    );
  }
}

FileUpload.propTypes = {
  getPresignedUrl: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  isUploading: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ...fileUpload(state)
});

export default connect(mapStateToProps, actions)(FileUpload);
