import React, { Component } from "react";
import api from "../../api";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: "",
      energy: "",
      acousticness: "",
      moreSongs: [],
      filtered: []
    };
  }
  // handleInputChange(stateFieldName, event) {
  //   let newState = {};
  //   newState[stateFieldName] = event.target.value;

  //   this.setState(newState);
  // }
  // handleClick(e) {
  //   e.preventDefault();
  //   let data = {
  //     danceability: this.state.danceability
  //   };
  // }
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      console.log(moreSongs);
      this.setState({
        moreSongs: moreSongs.songs
      });
    });
  };
  handleInput = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    let filtered = this.state.moreSongs.filter(song => {
      if (song.danceability > this.state.danceability) {
        return true;
      } else return false;
    });
    let filteredEnergy = filtered.filter(song => {
      if (song.energy > this.state.energy) {
        return true;
      } else return false;
    });
    let filteredAcoustic = filteredEnergy.filter(song => {
      if (song.energy > this.state.acousticness) {
        return true;
      } else return false;
    });

    //here is the score algorithm...
    // this.state.moreSongs
    //   .map(song => {
    //     let score = Math.abs(song.danceability - this.state.danceability);
    //     return {
    //       ...score,
    //       score: score
    //     };
    //   })
    //   .sort((a, b) => a.score - b.score)
    //   .slice(0, 10)
    //   .map(songs => songs._id);

    return (
      <div className="Songs">
        <form>
          Danceability:{" "}
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

        {filteredAcoustic.map(song => (
          <div>
            <h2>{song._id}</h2>
          </div>
        ))}
        <button onClick={this.getAllSongs} className="btn-style">
          Preview Songs
        </button>
      </div>
    );
  }
}

export default Songs;
