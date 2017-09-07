// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './shared/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
