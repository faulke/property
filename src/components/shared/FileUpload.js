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
    if (!this.props.multiple && this.props.files.length) {
      this.props.deleteFile(0);
    }
    files.forEach(file => this.props.getPresignedUrl(file, this.props.uuid));
  }

  render() {
    const { files, isUploading, input, label, multiple } = this.props;
    return (
      <FormGroup controlId={input.name} className={styles.container}>
        <Col componentClass={ControlLabel}>
          {label}
        </Col>
        <Col>
          <Dropzone 
            onDrop={this.onDrop}
            name={input.name}
            multiple={multiple}
            className={`${styles.fileupload}`}
          >
            <p>Drop files here, or click to select files to upload.</p>
          </Dropzone>
          {
            files.map((file, i) => (
              <Row key={i} className={styles.fileRow}>
                <Row className={styles.row}>
                  <Col sm={12}>
                    <div className={styles.labelSuccess}>{ i === 0 ? "Cover photo" : "" }</div>
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col xs={4}>
                    <div
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
                  </Col>
                  <Col xs={8}>
                    <textarea rows={4} placeholder="Add a caption..." />
                  </Col>
                </Row>
                <Row className={styles.row}>
                  <Col xs={4} xsOffset={8} style={{ textAlign: "right" }}>
                    { 
                      isUploading ? 
                        "" :
                        <a 
                          role={"button"} 
                          tabIndex={0}
                          onClick={() => this.props.deleteFile(i)}
                        >
                          X Remove File
                        </a>
                    }
                  </Col>
                </Row>
              </Row>
            ))
          }
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
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  deleteFile: PropTypes.func.isRequired,
  multiple: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  ...fileUpload(state)
});

export default connect(mapStateToProps, actions)(FileUpload);
