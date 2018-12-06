import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";
import Login from "./pages/Login";
import LoginCallback from "./pages/LoginCallback";
import EditProfile from "./pages/EditProfile";
import About from "./pages/About";
import api from "../api";
import logo from "../Moodify.png";

import LottieControl from "./pages/Animation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo-container">
            <div className="animation-container">
              <LottieControl className="logo-animation" />
            </div>
            {/* <img src={logo} className="Moodify-logo" alt="logo" /> */}
            <h1 className="App-title">Moodify</h1>
          </div>
          <NavLink to="/" exact>
            Home
          </NavLink>
          {api.isLoggedIn() && <NavLink to="/playlists">Playlists</NavLink>}
          {/* <NavLink to="/playlists">Playlists</NavLink> */}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
          <NavLink to="/secret">About</NavLink>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/secret" component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/login/callback" component={LoginCallback} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
