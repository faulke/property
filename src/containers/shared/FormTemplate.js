import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/index';

class FormTemplate extends Component {
  constructor(props) {
    super(props);

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(evt) {
    const { name, value } = evt.target;
    this.props.updateInput(name, value);
  }
}

FormTemplate.propTypes = {
  updateInput: React.PropTypes.func.isRequired
};

export default FormTemplate;
