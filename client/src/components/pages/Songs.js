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
  // handleInput = e => {
  //   console.log("well, at least something happened");
  //   let filtered = this.state.moreSongs.filter(song => {
  //     if (song.danceability > e.target.value) {
  //       return true;
  //     } else return false;
  //   });

  //   this.setState({
  //     danceability: filtered
  //   });

  // console.log(filtered);
  // if (song.danceability > e.targetvalue) {
  //   value = true;
  // }

  // this.setState({
  //   danceability: e.target.value
  // });

  // return this.state.moreSongs.filter(song => {
  //   if (song.danceability > e.target.value) {
  //     return true;
  //   } else return false;
  // });
  // };

  render() {
    // let filtered = this.state.moreSongs.filter(song => {
    //   if (song.danceability > this.target.value) {
    //     return true;
    //   } else return false;
    // });
    return (
      <div className="Songs">
        <form>
          Danceability:{" "}
          <input
            className="input-field"
            type="number"
            value={this.state.danceability}
            onChange={e => {
              this.handleInput(e);
            }}
          />{" "}
          <br />
        </form>

        {/* {filtered.map(song => (
          <div>
            <h2>{song._id}</h2>
          </div>
        ))} */}
        <button onClick={this.getAllSongs} className="btn-style">
          Add all of the songs
        </button>
      </div>
    );
  }
}

export default Songs;
