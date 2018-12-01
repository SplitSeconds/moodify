import React, { Component } from 'react';
//import jsonSongs from '../../../../server/bin/songs.json'
import api from '../../api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: '0.4',
      value2: '',
      value3: '',
      isPlaylist: false
    }
  }
  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }
  handleClick(e) {
    e.preventDefault()
    console.log(this.state.value1, this.state.value2, this.state.value3)
    let data = {
      value1: this.state.value1,
      value2: this.state.value2,
      value3: this.state.value3,
      // ids: songs.audio_features.map(function(song){
      //   let result = []
      //   for (i = 0; i < songs.audio_features.length; i++){
      //     if (song.danceability > value1 && song.energy > value2){
      //       result.push(song.id)
      //     }
      //     console.log("RESULT", result)
      //     return result
      //   }
      // })
    }
    api.postUserInput(data)
      .then(result => {
        this.setState({
          value1: '0.2',
          value2: '',
          value3: '',
          isPlaylist: true,
          message: `Your playlist will be created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
  render() {      
    return (
      <div className="Home">
        <h2>How do you feel today?</h2>
        <form>
          Value1: <input className="input-field" type="number" min="0" max="1" step="0.2" value={this.state.value1} onChange={(e) => { this.handleInputChange("value1", e) }} /> <br />
          Value2: <input type="number" value={this.state.value2} onChange={(e) => { this.handleInputChange("value2", e) }} /> <br />
          Value3: <input type="number" value={this.state.value3} onChange={(e) => { this.handleInputChange("value3", e) }} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Get playlist</button>
        </form>
       
          <div>
          
             <h3>Playlist</h3>
             <iframe src="https://open.spotify.com/embed/album/7M0Zg2A3mrTOOqfVyRUjb8" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        
         

      </div>
    );
  }
}

export default Home;