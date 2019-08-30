import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import { FlexboxGrid, Panel } from 'rsuite';
import * as actions from '../actions/index';
import { getAuth, isLoggedIn } from '../selectors';
import RegisterForm from '../components/account/RegisterForm';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthed, isPosting } = nextProps;
    if (isAuthed) {
      browserHistory.push('/properties');
    }
  }

  submit(values) {
    this.props.register({ ...values });
  }

  render() {
    const { isPosting, registerError } = this.props;
    return (
      <div>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12} style={{ textAlign: "center" }}>
            <h2>Register for Rental Swag</h2>
            <span>
              Already have an account?
            </span>
            &nbsp;
            <Link
              to="/account/login"
            >Sign in here</Link>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Register</h3>} bordered>
              <RegisterForm 
                onSubmit={this.submit} 
                isPosting={isPosting} 
                registerError={registerError}
              />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
  isPosting: PropTypes.bool.isRequired,
  registerError: PropTypes.string,
  isAuthed: PropTypes.bool.isRequired
};

RegisterPage.defaultProps = {
  registerError: null
};

const mapStateToProps = state => ({
  ...getAuth(state),
  isAuthed: isLoggedIn(state)
});

export default connect(mapStateToProps, actions)(RegisterPage);
