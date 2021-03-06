import React, { Component } from "react";
import api from "../../api";
import AnimationBackground from "./AnimationBackground";

class Login extends Component {
  render() {
    return (
      <div className="login-wrapper">
        <div className="Animation">
          <AnimationBackground />
        </div>
        <div className="login-text">
          <h2 className="login-h2">Welcome.</h2>
          <button className="btn-style welcome-login-btn">
            <a
              href={api.service.defaults.baseURL + "/spotify-login"}
              className="btn-link"
            >
              Login with Spotify
            </a>
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
