import React, { Component } from 'react';
class InputRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 5
    };
  }

  render() {
    return (
      <form className="form">
        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onChangeComplete={value => console.log(value)} />

      </form>
    );
  }
}

export default InputRange;