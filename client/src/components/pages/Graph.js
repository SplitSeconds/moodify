import React, { Component } from 'react'
import '../../styles/index.css';
import api from "../../api";
import {XYPlot, MarkSeries, VerticalGridLines, HorizontalGridLines } from 'react-vis';


export default class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: '',
      value2: '',
      value3: ''
    }
  }

  handleClick(e) {
      e.preventDefault();
      let data = {
        //audio_features.danceability
        //audio_features.energy
        //audio_features.valence
        value1: this.state.value1,
        value2: this.state.value2,
        value3: this.state.value3
      };
      api
        .getMyRecentlyPlayedTracks(data)
        .then(result => {
          console.log("GRAPHDATA", result);
          this.setState({
            value1: this.state.value1,
            value2: this.state.value2,
            value3: this.state.value3,
            message: `Your graph will be created`
          });
          setTimeout(() => {
            this.setState({
              message: null
            });
          }, 2000);
        })
        .catch(err => this.setState({ message: err.toString() }));
    }


  render() {
    const myData = [
      {x: 0, y: 8, size: 5},
      {x: 1, y: 5, size: 5},
      {x: 2, y: 4, size: 5},
      {x: 3, y: 9, size: 5},
      {x: 4, y: 1, size: 5},
      {x: 5, y: 7, size: 5},
      {x: 6, y: 6, size: 5},
      {x: 7, y: 3, size: 5},
      {x: 8, y: 2, size: 5},
      {x: 9, y: 0, size: 5}
    ];
  return (  
    <div>
      <div className="graph"> 
        <div className="graph-box">
          <XYPlot height={300} width={300}>
            <VerticalGridLines />
            <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
            <VerticalGridLines style={{stroke: '#B7E9ED'}} />
            {/* <LineSeries stroke="red" style={{strokeLinejoin: 'round', strokeWidth: 4}} data={series1} /> */}
              {/* width={300}
                height={300}> */}
            <MarkSeries
              className="mark-series-example"
              color="white"
              opacity="0.5"
              sizeRange={[5, 5]}
              data={myData}/>
          </XYPlot>
        </div>
      </div>
      <button className="btn-style">Create graph</button>
    </div>
    )
  }
}