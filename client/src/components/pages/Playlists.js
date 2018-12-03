import React, { Component } from "react";
import api from "../../api";
import Graph from "./Graph";
import EditProfile from "./EditProfile";

export default class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePic: "",
      about: "I like music.",
      playlists: [],
      savedtracks: [],
      toptracks: []
    };
  }
  handleClickGet = () => {
    api.getPlaylists().then(playlists => {
      this.setState({
        playlists
      });
    });
  };
  handleClickAdd = () => {
    api.addPlaylistWithFixedName().then(data => {
      console.log(data);
    });
  };
  handleClickSavedTracks = () => {
    api.getMySavedTracks().then(savedtracks => {
      console.log(savedtracks);
      this.setState({
        savedtracks
      });
    });
  };
  handleClickTopTracks = () => {
    api.getMyTopTracks().then(toptracks => {
      console.log(toptracks);
      this.setState({
        toptracks
      });
    });
  };
  handleClickEdit = () => {
    this.props.history.push("/edit-profile/" + { EditProfile });
  };
  componentDidMount() {
    api.getSpoftiyUserData().then(data =>
      //console.log("Spotify data", data, "Spotify pic", data.body.images[0].url)
      this.setState({
        name: data.body.display_name
        // profilePic: data.body.images[0].url
      })
    );
  }
  render() {
    return (
      <div className="Playlist">
        <h1>{this.state.name}'s Profile</h1>

        <div className="about-container">
          <div className="pic-div">
            <img
              src={this.state.profilePic}
              alt="Profile picture"
              className="profile-pic"
            />
          </div>
          <div className="about-container-section">
            <h3>About me:</h3>
            <p>{this.state.about}</p>
          </div>
        </div>
        <button onClick={this.handleClickEdit} className="btn-style">
          Edit Profile
        </button>

        <h2>Your mood</h2>
        <Graph />

        <h1>Playlists</h1>
        <button onClick={this.handleClickGet} className="btn-style">
          Get playlists
        </button>
        <button onClick={this.handleClickAdd} className="btn-style">
          Add playlist
        </button>
        <button onClick={this.handleClickSavedTracks} className="btn-style">
          My saved tracks
        </button>
        <hr />
        {this.state.savedtracks.map(t => (
          <div>
            <h2>{t.name}</h2>
            <a href={t.external_urls.spotify}>Link</a>
          </div>
        ))}
        <hr />
        {this.state.playlists.map(p => (
          <div>
            <h2>{p.name}</h2>
            <a href={p.external_urls.spotify}>Link</a>
          </div>
        ))}
      </div>
    );
  }
}
