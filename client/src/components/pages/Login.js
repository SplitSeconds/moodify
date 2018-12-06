import React, { Component } from "react";
import api from "../../api";

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <button className="btn-style">
          <a href={api.service.defaults.baseURL + "/spotify-login"}>
            Login with Spotify
          </a>
        </button>
      </div>
    );
  }
}

export default Login;
