import React, { Component } from "react";
import api from "../../api";
import SpotifyPlayer from "react-spotify-player";
// import Animation from "./Animation";
import Gif from "../../animation/Moodify_Logo.svg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: "",
      songs: "",
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
          danceability: this.state.danceability,
          // isPlaylist: true,
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
  // addSongs = () => {
  //   api.getTopSongsPlaylist().then(data => {
  //     console.log("hi");
  //     // this.setState({
  //     //   songs: data.body
  //     // });
  //   });
  // };
  render() {
    return (
      <div className="Home">
        {/* <Animation /> */}
        <img src={Gif} className="gif" alt="logo-ani" />
        <h2>How do you feel today?</h2>
        <form>
          Danceability:{" "}
          <input
            className="input-field"
            type="number"
            min="0"
            max="1"
            step="0.2"
            value={this.state.danceability}
            onChange={e => {
              this.handleInputChange("danceability", e);
            }}
          />{" "}
          <br />
          <button onClick={e => this.handleClick(e)} className="btn-style">
            Get playlist
          </button>
        </form>
        <p>songs: </p>
        <button onClick={this.addSongs} className="btn-style">
          Add songs to playlist
        </button>

        {/* <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={18}
          maximumValue={71}
          value={this.state.value1}
          onValueChange={value1 => this.setState({ value1: value1 })}
          onSlidingComplete={value1 => this.getVal(value1)}
        /> */}

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
  componentDidMount() {
    api
      .getSongs()
      .then(songs => {
        console.log(songs);
        this.setState({
          songs: songs
        });
      })
      .catch(err => console.log(err));
  }
}

export default Home;