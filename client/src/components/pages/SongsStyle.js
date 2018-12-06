import React, { Component } from "react";
import InputRange from "react-input-range";
import SpotifyPlayer from "react-spotify-player";
import "react-input-range/lib/css/index.css";
import api from "../../api";

class SongsStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: 0.7,
      energy: 0.3,
      valence: 0.5,
      moreSongs: [],
      firstPlaylist: [],
      buttonIsVisible: false,
      playlistName: "",
      isloading: false,
      isPlaylistLoading: false,
      nbOfSongs: 12
    };
  }
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      console.log(moreSongs);
      this.setState({
        moreSongs: moreSongs.songs,
        buttonIsVisible: true
      });
    });
  };
  postPlaylist = () => {
    this.setState({
      isPlaylistLoading: true
    });
    api
      .addToPlaylist(
        this.getFilteredSongs().map(song => song.uri),
        this.state.playlistName
      )
      .then(() => {
        console.log("HEYyyyyyy");

        this.displayPlaylist();
      })
      .catch(error => console.log(error));
  };

  displayPlaylist = () => {
    api.getPlaylists().then(firstPlaylist => {
      this.setState({
        firstPlaylist,
        isPlaylistLoading: false
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
        // a score is added, the closer score and 0 are, the better it is
        let score =
          Math.abs(song.danceability - this.state.danceability) +
          Math.abs(song.energy - this.state.energy) +
          Math.abs(song.valence - this.state.valence);

        return {
          ...song,
          score: score
        };
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, this.state.nbOfSongs);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ playlistName: e.target.value });
  }

  render() {
    let filtered = this.getFilteredSongs();

    return (
      <div className="form-wrapper">
        <form className="form">
          <div className="form-label">
            <span>Slow</span>
            <span>Dancey</span>
          </div>
          <InputRange
            maxValue={0.85}
            minValue={0.2}
            step={0.01}
            name="danceability"
            value={this.state.danceability}
            onChange={danceability =>
              this.setState({ danceability, buttonIsVisible: true })
            }
            onChangeComplete={this.getAllSongs}
            // {danceability => console.log("value1: " + danceability)}
          />
          <div className="form-label">
            <span>Chill</span>
            <span>Energetic</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0.15}
            step={0.01}
            name="energy"
            value={this.state.energy}
            onChange={energy => this.setState({ energy })}
            onChangeComplete={this.getAllSongs}
          />
          {/* {energy => console.log("value1: " + energy)} */}
          <div className="form-label">
            <span>Moody</span>
            <span>Cheerful</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0.15}
            step={0.01}
            name="valence"
            value={this.state.valence}
            onChange={valence => this.setState({ valence })}
            onChangeComplete={this.getAllSongs}
          />
          {/* {acousticness => console.log("value1: " + acousticness)} */}
          <div className="nb-of-songs-input">
            <span>Enter number of songs for playlist</span>
            <input
              className="input-field nb-input"
              type="number"
              min="1"
              name="nbOfSongs"
              value={this.state.nbOfSongs}
              onChange={e => {
                this.setState({
                  nbOfSongs: e.target.value
                });
              }}
            />
          </div>
        </form>

        <div className="songs-preview-with-btn">
          <div className="songs-preview-container">
            {filtered.map(song => (
              <div key={song.uri} className="songs-preview-section">
                <div className="song-preview-elements">
                  <img src={song.image} />
                  <div className="song-info">
                    <span className="song-name inline-block">{song.name}</span>
                    <span className="song-artists inline-block">
                      {song.artists}
                    </span>
                    {/* <span className="artist-name">{song.artistName}</span> */}
                  </div>
                </div>

                {/* <SpotifyPlayer
                  uri={song.uri}
                  // uri="spotify:track:6rqhFgbbKwnb9MLmUQDhG6"
                  size="compact"
                  view="list"
                  theme="black"
                /> */}
              </div>
            ))}
          </div>
          <p className="name-your-playlist">Name your playlist:</p>{" "}
          <div className="playlist-title">
            <input
              className="input-field"
              type="text"
              name="playlistName"
              value={this.state.playlistName}
              onChange={e => {
                this.handleSubmit(e);
              }}
            />{" "}
          </div>
          <div className="create-playlist-btn-wrapper">
            <button
              onClick={this.postPlaylist}
              name="buttonIsVisible"
              className="btn-style create-playlist-btn"
              width="500"
            >
              Create playlist
            </button>
          </div>
          <div className="user-playlists-wrapper">
            {this.state.isPlaylistLoading && <div>Loading...</div>}
            {!this.state.isPlaylistLoading &&
              this.state.firstPlaylist.length > 0 && (
                <SpotifyPlayer
                  uri={this.state.firstPlaylist[0].uri}
                  size="large"
                  view="list"
                  theme="black"
                />
              )}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getAllSongs();
  }
}

export default SongsStyle;
