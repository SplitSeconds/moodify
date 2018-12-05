import React, { Component } from 'react'
import api from '../../api'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      about: 'I like music!'
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // handleChange(e) {
  //   this.setState({
  //     file: e.target.files[0]
  //   })
  // }
  handleSubmit(e) {
    e.preventDefault()
    let body = {
      about: this.state.about,
    }
    api.editProfile(body)
      .then(data => {
        // Add a message for 3 seconds
        this.setState({
          message: "Your profile was updated"
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 3000)
      })
  }
  render() {
    // If there is 
    if (!this.state.username) {
      return <div><h2>Profile</h2><p>Loading...</p></div>
    }
    return (
      <div className="Profile">
        <h2>Profile</h2>


        <form onSubmit={(e) => this.handleSubmit(e)}>
          About:
          <input type="text" name="about" value={this.state.about} onChange={this.handleChange} />
          <br />

          <button type="submit">Update profile</button>
        </form>

        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
  componentDidMount() {
    api.getSpoftiyUserData()
      .then(user => {
        this.setState({
          about: user.about
        })
      })
  }
}

