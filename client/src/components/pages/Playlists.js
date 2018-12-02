import React, { Component } from 'react'
import api from '../../api';

export default class Playlists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      profilePic: '',
      playlists: []
    }
  }
  handleClickGet = () => {
    api.getPlaylists()
    .then(playlists => {
      this.setState({
        playlists
      })
    })
  }
  handleClickAdd = () => {
    api.addPlaylistWithFixedName()
    .then(data => {
      console.log(data)
    })
  }
  componentDidMount() {
    api.getSpoftiyUserData()
      .then(data =>
        //console.log("Spotify data", data, "Spotify pic", data.body.images[0].url)
      this.setState ({
        name: data.body.display_name,
        profilePic: data.body.images[0].url
      })
    )
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}'s Profile</h1>
        <img src={this.state.profilePic} alt="Profile picture" />

        <h1>Playlists</h1>
        <button onClick={this.handleClickGet}>Get playlists</button>
        <button onClick={this.handleClickAdd}>Add playlist</button>
        <hr/>
        {this.state.playlists.map(p => (
          <div>
            <h2>{p.name}</h2>
            <a href={p.external_urls.spotify}>Link</a>
          </div>
        ))}
      </div>
    )
  }
}
