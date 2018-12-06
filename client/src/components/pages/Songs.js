import React, { Component } from "react";
import api from "../../api";
import InputRange from "react-input-range";
import SpotifyPlayer from "react-spotify-player";
import { readFile } from "fs";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: "",
      energy: "",
      acousticness: "",
      moreSongs: [],
      playlistName: "",
      firstPlaylist: [],
      isloading: false
    };
  }
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      this.setState({
        moreSongs: moreSongs.songs
      });
    });
  };
  postPlaylist = () => {
    api
      .addToPlaylist(
        this.getFilteredSongs().map(song => song.uri),
        this.state.playlistName
      )
      .then(() => {})
      .catch(error => console.log(error));
    this.displayPlaylist();
  };

  displayPlaylist = () => {
    api.getPlaylists().then(firstPlaylist => {
      this.setState({
        firstPlaylist
      });
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ playlistName: e.target.value });
  }

  getFilteredSongs() {
    return this.state.moreSongs
      .map(song => {
        let score =
          Math.abs(song.danceability - this.state.danceability) +
          Math.abs(song.energy - this.state.energy) +
          Math.abs(song.acousticness - this.state.acousticness);

        return {
          ...song,
          score: score
        };
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, 10);
  }

  render() {
    let filtered = this.getFilteredSongs();
    return (
      <div className="Songs">
        <form>
          Danceability:{" "}
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.danceability}
            onChange={danceability => this.setState({ danceability })}
            onChangeComplete={danceability =>
              console.log("value1: " + danceability)
            }
          />
          <br />
          Energy:{" "}
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.energy}
            onChange={energy => this.setState({ energy })}
            onChangeComplete={energy => console.log("value1: " + energy)}
          />
          <br />
          Acousticness:{" "}
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.acousticness}
            onChange={acousticness => this.setState({ acousticness })}
            onChangeComplete={acousticness =>
              console.log("value1: " + acousticness)
            }
          />
          <br />
          Playlist name:{" "}
          <input
            className="input-field"
            type="text"
            name="playlistName"
            value={this.state.playlistName}
            onChange={e => {
              this.handleSubmit(e);
            }}
          />{" "}
          <br />
        </form>

        {filtered.map(song => (
          <div>
            <h2>{song.name}</h2>
          </div>
        ))}

        <button onClick={this.postPlaylist} className="btn-style">
          Create playlist
        </button>

        <div className="user-playlists-wrapper">
          <SpotifyPlayer
            uri={
              this.state.firstPlaylist.length ? (
                this.state.firstPlaylist[0].uri
              ) : (
                <p>Default Markup</p>
              )
            }
            size="large"
            view="list"
            theme="black"
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getAllSongs();
  }
}

export default Songs;
