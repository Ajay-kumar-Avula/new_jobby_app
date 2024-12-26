import { Component } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

import './index.css';

class LoginForm extends Component {
  state = { username: '', password: '', showSubmitError: false, errorMsg: '' };

  onSubmitSuccess = jwtToken => {
    const { navigate } = this.props;
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/');
  };

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  submitForm = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const loginApiUrl = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(loginApiUrl, options);
      const data = await response.json();
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token);
      } else {
        this.onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      this.onSubmitFailure('Something went wrong. Please try again.');
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="password"
        />
      </>
    );
  };

  renderUserNameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="username"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;

    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <div className="input-container">{this.renderUserNameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
