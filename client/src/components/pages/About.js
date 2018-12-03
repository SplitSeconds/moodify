import React, { Component } from 'react';

class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secret: null,
      message: null
    }
  }
  render() {
    return (
      <div className="Secret">
        <h2>About</h2>

        <p>Moodify is cool !!!</p>

      </div>
    );
  }
}

export default Secret;
