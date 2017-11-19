import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
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

  submit(values) {
    const { files } = this.props;
    this.props.createProperty(values, files);
  }

  deleteFile(index) {
    this.props.deleteFile(index);
  }

  render() {
    const { isPosting, isUploading, files } = this.props;
    return (
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
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

AddPropertyPage.propTypes = {
  createProperty: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  deleteFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...createProperty(state),
  ...fileUpload(state)
});

export default connect(mapStateToProps, actions)(AddPropertyPage);
