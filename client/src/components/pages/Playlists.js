import React, { Component } from "react";
import api from "../../api";
import SpotifyPlayer from "react-spotify-player";
import Graph from "./Graph";
import EditProfile from "./EditProfile";
import "../../styles/index.css";

export default class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePic: "",
      about: "I like music.",
      playlists: [],
      recenttracks: []
    };
  }

  handleClickAdd = () => {
    api.addPlaylistWithFixedName().then(data => {
      console.log(data);
    });
  };
  handleClickGraph = () => {
    // display users mood graph on click
    // Old code to test
    // api.getMyRecentlyPlayedTracks().then(recenttracks => {
    //   console.log(recenttracks);
    //   this.setState({
    //     recenttracks
    //   });
    // });
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

    api.getPlaylists().then(playlists => {
      console.log(playlists);
      this.setState({
        playlists
      });
    });
  }
  render() {
    return (
      <div className="Playlist">
        <h1>{this.state.name}'s Profile</h1>

        <div className="about-container">
          <div className="pic-div">
            <img
              src={this.state.profilePic}
              alt="Profile pic"
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
        {/* <button onClick={this.handleClickGraph} className="btn-style">
          Create graph
        </button> */}

        {/* <button onClick={this.handleClickAdd} className="btn-style">
          Add playlist
        </button> */}

        <h1>Your playlists</h1>

        {this.state.playlists.map((p, index) => (
          <div className="user-playlists-wrapper" key={index}>
            <SpotifyPlayer uri={p.uri} size="large" view="list" theme="black" />
            <div />
          </div>
        ))}
      </div>
    );
  }
}
