import React, { Component } from "react";
import api from "../api";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "../styles/index.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      danceability: 0.7,
      energy: 0.3,
      valence: 0.5,
      // acousticness: 0.5,
      moreSongs: [],
      filtered: []
    };
  }
  getAllSongs = () => {
    api.getAllSongs().then(moreSongs => {
      console.log("moreSongs: " + moreSongs);
      this.setState({
        moreSongs: moreSongs.songs
      });
    });
  };
  handleInput = e => {
    console.log("handleInput was called!");

    // let name = e.target.name;
    // this.setState({
    //   [name]: e.target.value
    // });
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
            onChange={danceability => this.setState({ danceability })}
            onChange={e => {
              this.handleInput(e);
            }}
            onChangeComplete={this.getAllSongs}
            // console.log("danceability: " + danceability);
          />

          <div className="form-label">
            <span>Moody</span>
            <span>Cheerful</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            value={this.state.valence}
            onChange={valence => this.setState({ valence })}
            onChangeComplete={valence => console.log("valence" + valence)}
          />

          <div className="form-label">
            <span>Chill</span>
            <span>Aggressive</span>
          </div>
          <InputRange
            maxValue={1}
            minValue={0}
            step={0.01}
            value={this.state.energy}
            onChange={energy => this.setState({ energy })}
            onChangeComplete={energy => console.log("energy" + energy)}
          />
          <br />
          <button onClick={e => this.handleClick(e)} className="btn-style">
            Get playlist
          </button>
        </form>
      </div>
    );
  }
}

export default Slider;
