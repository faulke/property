import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'rsuite';
import styles from './formInput.less';

export default class MapsAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;
    this.script = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.script = document.createElement("script");
    this.script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&libraries=places`;
    this.script.async = 1;
    this.script.defer = 1;
    this.script.onload = () => this.initAutocomplete();
    document.body.appendChild(this.script);
  }

  initAutocomplete() {
    /* global google */
    this.autocomplete = new google.maps.places.Autocomplete(this._input, { types: ['geocode'] });
    this.autocomplete.setFields(['address_component']);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceChanged(place);
  }

  render() {
    const {
      id,
      name,
      label,
      placeholder,
      input
    } = this.props;

    return (
      <FormGroup controlId={name}>
        <ControlLabel>{label}</ControlLabel>
        <input
          id={id}
          ref={(c) => this._input = c}
          type="text"
          name={name}
          placeholder={placeholder}
          className="rs-input form-control"
          style={{ width: "100%" }}
          {...input}
        />
      </FormGroup>
    );
  }
}

MapsAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  onPlaceChanged: PropTypes.func.isRequired
};

MapsAutocomplete.defaultProps = {
  name: '',
  label: '',
  placeholder: 'Enter address'
};
