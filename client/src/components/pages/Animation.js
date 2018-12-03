import React, { Component } from "react";
import Lottie from "lottie-react-web";
import bodymovin from "bodymovin";
import animation from "../../animation/Moodify_Logo.json";

export default class Animation extends Component {
  render() {
    // var animation = bodymovin.loadAnimation({
    //   container: document.getElementById('lottie'), // Required
    //   path: 'data.json', // Required
    //   renderer: 'svg', // Required
    //   loop: true, // Optional
    //   autoplay: true, // Optional
    //   name: "Hello World", // Name for future reference. Optional.
    return <div className="Animation" />;
  }
}
