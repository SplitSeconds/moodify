import React, { Component } from 'react';
import api from '../../api';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <a href={api.service.defaults.baseURL+"/spotify-login"}>Login with Spotify</a>
      </div>
    );
  }
}

export default Login;
