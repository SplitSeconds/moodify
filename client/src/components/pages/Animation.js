import React, { Component } from 'react'
import Lottie from 'lottie-react-web'
import animation from '../../animation/Moodify_Logo.json'



  export default class Graph extends Component {
    render() {
      return (  
        <div>
          <Lottie
            options={{animationData: animation}}
          />
        </div>
      )
    }
  }
