import React, { Component } from "react";
import api from "../../api";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: "",
      moreSongs: []
    };
  }
  handleInputChange(stateFieldName, event) {
    let newState = {};
    newState[stateFieldName] = event.target.value;

    this.setState(newState);
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
  componentDidMount() {}

  render() {
    let filtered = this.state.moreSongs.filter(song => {
      if (song.danceability > song.danceability < 0.51) {
        return true;
      } else return false;
    });
    return (
      <div className="Songs">
        <form>
          Danceability:{" "}
          <input
            className="input-field"
            type="number"
            value={this.state.danceability}
            onChange={e => {
              this.handleInputChange("danceability", e);
            }}
          />{" "}
          <br />
        </form>

        {filtered.map(song => (
          <div>
            <h2>{song._id}</h2>
          </div>
        ))}
        <button onClick={this.getAllSongs} className="btn-style">
          Add all of the songs
        </button>
      </div>
    );
  }
}

export default Songs;
