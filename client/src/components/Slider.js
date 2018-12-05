import React, { Component } from "react";
import InputRange from "react-input-range";
// import "react-input-range/lib/css/index.css";
import "../styles/index.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: 0,
      value2: 0,
      value3: 0
    };
  }

  render() {
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
            value={this.state.value1}
            onChange={value1 => this.setState({ value1 })}
            onChangeComplete={value1 => console.log("value1: " + value1)}
          />

          <div className="form-label">
            <span>Instrumental</span>
            <span>Vocals</span>
          </div>
          <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.value2}
            onChange={value2 => this.setState({ value2 })}
            onChangeComplete={value2 => console.log("value2: " + value2)}
          />

          <div className="form-label">
            <span>Chill</span>
            <span>Aggressive</span>
          </div>
          <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.value3}
            onChange={value3 => this.setState({ value3 })}
            onChangeComplete={value3 => console.log("value3: " + value3)}
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
