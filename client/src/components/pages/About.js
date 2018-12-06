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
      <div className="about">
        <h2>About</h2>

        <p>Moodify is cool !!!</p>

        <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/L-Wilson" class="about-link">Lindsay</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/anjapatel" class="about-link">Anjali</a> and <a target="_blank" rel="noopener noreferrer" href="https://github.com/SplitSeconds" class="about-link">Nele</a> ate a lot of choclate while coding this page in 9 days. 
        &hearts;
        </p>
      </div>
     
    );
  }
}

export default Secret;
