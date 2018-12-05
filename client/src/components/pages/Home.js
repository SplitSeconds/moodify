import React, { Component } from "react";
import api from "../../api";
import Songs from "./Songs";
import SongsStyle from "./SongsStyle";
import SpotifyPlayer from "react-spotify-player";
// import Animation from "./Animation";
import Gif from "../../animation/Moodify_Logo.svg";
import Slider from "../Slider";
import "react-input-range/lib/css/index.css";
import "../../styles/index.scss";


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
    console.log(
      "hello from handleClick!" + this.state.value1,
      "two: " + this.state.value2,
      "three: " + this.state.value3
    );
    let data = {
      value1: this.state.value1,
      value2: this.state.value2,
      value3: this.state.value3
    };
    api
      .postUserInput(data)
      .then(result => {
        this.setState({
          value1: "",
          value2: "",
          value3: "",
          isPlaylist: true,
          message: `Your playlist will be created`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  // handleClick(e) {
  //   e.preventDefault();
  //   let data = {
  //     danceability: this.state.danceability
  //   };
  //   api
  //     .getSongs(data)
  //     .then(result => {
  //       this.setState({
  //         result
  //       });
  //       setTimeout(() => {
  //         this.setState({
  //           message: null
  //         });
  //       }, 2000);
  //     })
  //     .catch(err => this.setState({ message: err.toString() }));
  // }
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
          <div className="slider-wrapper">
            <Slider />
          </div>

          <SpotifyPlayer
            uri="spotify:album:7M0Zg2A3mrTOOqfVyRUjb8"
            size="large"
            view="List"
            theme="black"
          />
        </div>
      </div>
    );
  }
}

export default Home;
