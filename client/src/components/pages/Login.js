import React, { Component } from "react";
import api from "../../api";

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <a
          href={api.service.defaults.baseURL + "/spotify-login"}
          className="btn-style"
        >
          Login with Spotify
        </a>
      </div>
    );
  }
}

export default Login;
