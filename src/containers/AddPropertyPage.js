import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Content
} from 'rsuite';
import * as actions from '../actions/index';
import AddPropertyForm from '../components/property/AddPropertyForm';
import { createProperty, fileUpload } from '../selectors';
import PageHeader from '../components/shared/PageHeader.js';

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
    files.forEach((file, index) => file.index = index);
    this.props.createProperty(values, storageKey, files);
  }

  deleteFile(index) {
    this.props.deleteFile(index);
  }

  render() {
    const { isPosting, isUploading, files, success, storageKey } = this.props;
    return (
      <Container>
        <Header>
          <PageHeader
            title={"Add Property"}
            btnLink={"/properties"}
            btnTitle={"All properties"}
          />
        </Header>
        <Content>
          <AddPropertyForm 
            isPosting={isPosting} 
            onSubmit={this.submit}
            isUploading={isUploading}
            files={files}
            deleteFile={this.deleteFile}
            storageKey={storageKey}
          />
        </Content>
      </Container>
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
