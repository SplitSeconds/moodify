import React, { Component } from "react";
import api from "../../api";
import Songs from "./Songs";
import SongsStyle from "./SongsStyle";
import SpotifyPlayer from "react-spotify-player";
// import Animation from "./Animation";
import Gif from "../../animation/Moodify_Logo.svg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: "",
      songs: [],
      moreSongs: [],
      isPlaylist: false
    };
  }
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }
  handleClick(e) {
    e.preventDefault();
    let data = {
      danceability: this.state.danceability
    };
    api
      .getSongs(data)
      .then(result => {
        this.setState({
          result
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  addSongs = () => {
    api.getTopSongsPlaylist().then(songs => {
      console.log(songs);
      this.setState({
        songs
      });
    });
  };
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      console.log(moreSongs);
      this.setState({
        moreSongs: moreSongs.songs
      });
    });
  };
  render() {
    return (
      <div className="Home">
        <div>
          <SongsStyle />
        </div>
        <div>
          <Songs />
        </div>
        {/* <Animation /> */}
        <img src={Gif} className="gif" alt="logo-ani" />
        <button onClick={this.addSongs} className="btn-style">
          Add songs to playlist
        </button>
        <button onClick={this.getAllSongs} className="btn-style">
          Add all of the songs
        </button>
        <div />
        <div>
          <h3>Playlist</h3>

          <SpotifyPlayer
            uri="spotify:album:7M0Zg2A3mrTOOqfVyRUjb8"
            size="large"
            view="List"
            theme="dark"
          />
        </div>
      </div>
    );
  }
}

export default Home;
