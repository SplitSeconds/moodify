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
      acousticness: 0.5,
      moreSongs: [],
      buttonIsVisible: false
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
  handleInput = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  getFilteredSongs() {
    return this.state.moreSongs
      .map(song => {
        // a score is added, the closer score and 0 are, the better it is
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
      <div className="form-wrapper">
        <form className="form">
          <div className="form-label">
            <span>Slow</span>
            <span>Dancey</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
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
            <span>Moody</span>
            <span>Cheerful</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.energy}
            onChange={energy => this.setState({ energy })}
            onChangeComplete={this.getAllSongs}
          />
          {/* {energy => console.log("value1: " + energy)} */}

          <div className="form-label">
            <span>Chill</span>
            <span>Aggressive</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            name="danceability"
            value={this.state.acousticness}
            onChange={acousticness => this.setState({ acousticness })}
            onChangeComplete={this.getAllSongs}
          />
          {/* {acousticness => console.log("value1: " + acousticness)} */}
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

          <div className="create-playlist-btn-wrapper">
            <button
              onClick={this.getPlaylist}
              name="buttonIsVisible"
              className="btn-style create-playlist-btn"
            >
              Create playlist
            </button>
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
