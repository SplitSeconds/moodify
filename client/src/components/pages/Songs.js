import React, { Component } from "react";
import api from "../../api";
import InputRange from "react-input-range";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: "",
      energy: "",
      acousticness: "",
      moreSongs: []
      // filtered: []
    };
  }
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      this.setState({
        moreSongs: moreSongs.songs
      });
    });
  };
  getPlaylist = () => {
    // let data = this.state.filtered;
    console.log("hi");
    api
      .addToPlaylist(this.getFilteredSongs().map(song => song.uri))
      .then(() => {})
      .catch(error => console.log(error));
  };
  handleInput = (fieldName, e) => {
    let name = e.target.name;
    this.setState({
      [fieldName]: e.target.value
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
          <input
            className="input-field"
            type="number"
            name="danceability"
            value={this.state.danceability}
            onChange={e => {
              this.handleInput(e);
            }}
          />{" "}
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
          <input
            className="input-field"
            type="number"
            name="energy"
            value={this.state.energy}
            onChange={e => {
              this.handleInput(e);
            }}
          />{" "}
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
          <input
            className="input-field"
            type="number"
            name="acousticness"
            value={this.state.acousticness}
            onChange={e => {
              this.handleInput(e);
            }}
          />{" "}
          <br />
        </form>

        {filtered.map(song => (
          <div>
            <h2>{song._id}</h2>
          </div>
        ))}

        {/* <button onClick={this.getAllSongs} className="btn-style">
          Preview Songs
        </button> */}
        <button onClick={this.getPlaylist} className="btn-style">
          Create playlist
        </button>
      </div>
    );
  }
  componentDidMount() {
    this.getAllSongs();
  }
}

export default Songs;
