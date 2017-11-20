import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Grid, Row, Col, Modal } from 'react-bootstrap';
import * as actions from '../actions/index';
import AddPropertyForm from '../components/property/AddPropertyForm';
import { createProperty, fileUpload } from '../selectors';
import PageHeader from '../components/shared/PageHeader.js';
import styles from './addProperty.less';

class AddPropertyPage extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  componentDidMount() {
    this.props.resetForm('addProperty');
  }

  submit(values) {
    const { files, storageKey } = this.props;
    this.props.createProperty(values, storageKey, files);
  }

  deleteFile(index) {
    this.props.deleteFile(index);
  }

  render() {
    const { isPosting, isUploading, files, success, storageKey } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <Grid fluid style={{ flex: "auto" }}>
          <PageHeader
            title={"Add Property"}
            btnStyle={`btn btn-default`}
            btnLink={"/properties"}
            btnTitle={<div><i className={styles.left} /> All properties</div>}
          />
          <Row>
            <Col sm={10} smOffset={1}>
              <AddPropertyForm 
                isPosting={isPosting} 
                onSubmit={this.submit}
                isUploading={isUploading}
                files={files}
                deleteFile={this.deleteFile}
                storageKey={storageKey}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

AddPropertyPage.propTypes = {
  createProperty: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  deleteFile: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  storageKey: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  ...createProperty(state),
  ...fileUpload(state)
});

export default connect(mapStateToProps, actions)(AddPropertyPage);
