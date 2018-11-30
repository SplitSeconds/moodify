import React, { Component } from 'react';
// import songs from '../database.json'
import api from '../../api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: '',
      value2: '',
      value3: '',
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
      value3: this.state.value3
    }
    api.postUserInput(data)
      .then(result => {
        this.setState({
          value1: "",
          value2: "",
          value3: "",
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
  // componentDidMount(){
  //   Axios.get("https://swapi.co/api/people/1")
  //     .then(result =>
  //     // console.log(result.data)
  //     newPlaylist = songs.audio_features.map(function(song){

  //       let result = []
  //       for (i = 0; i < songs.audio_features.length; i++){
  //         if (song.danceability > userInput1 && song.energy > userInput2){
  //         result.push(song.id)
  //       }
  //       console.log(result)
  //       return result
  //       }
  //     })
  //   )}

  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>Tell us your moods</p>
        <form>
          Value1: <input type="number" value={this.state.area} onChange={(e) => { this.handleInputChange("area", e) }} /> <br />
          Value2: <input type="number" value={this.state.area} onChange={(e) => { this.handleInputChange("area", e) }} /> <br />
          Value3: <input type="number" value={this.state.area} onChange={(e) => { this.handleInputChange("area", e) }} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Get playlist</button>
        </form>
      </div>
    );
  }
}

export default Home;