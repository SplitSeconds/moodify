import React, { Component } from 'react'
import '../../styles/index.css';
import api from "../../api";
import {XYPlot, MarkSeries, VerticalGridLines, HorizontalGridLines } from 'react-vis';


export default class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myData: [
        {x: 0, y: '', size: 5},
        {x: 1, y: '', size: 5},
        {x: 2, y: '', size: 5},
        {x: 3, y: '', size: 5},
        {x: 4, y: '', size: 5},
        {x: 5, y: '', size: 5},
        {x: 6, y: '', size: 5},
        {x: 7, y: '', size: 5},
        {x: 8, y: '', size: 5},
        {x: 9, y: '', size: 5}
      ]
    }
  }

  handleClick(e) {
      e.preventDefault();
      api
        .getMyRecentlyPlayedTracks().then(data => {
          console.log("GRAPHDATA", data);
          //this.state.myData[i].y= 0
          for(let i = 1; i < data.length; i++){
            this.state.myData[i].y = (((data.body[i-1].danceability + data.body[i-1].valence + data.body[i-1].energy) / 3) * 10)
          }
          this.setState({
          //let y1 = item[0]audio_features.danceability + item[0]audio_features.valence + item[0]audio_features.energy
          
            myData: [
              {x: 0, y: this.state.myData[1].y, size: 5},
              {x: 1, y: this.state.myData[2].y, size: 5},
              {x: 2, y: this.state.myData[3].y, size: 5},
              {x: 3, y: this.state.myData[4].y, size: 5},
              {x: 4, y: this.state.myData[5].y, size: 5},
              {x: 5, y: this.state.myData[6].y, size: 5},
              {x: 6, y: this.state.myData[7].y, size: 5},
              {x: 7, y: this.state.myData[8].y, size: 5},
              {x: 8, y: this.state.myData[9].y, size: 5},
              {x: 9, y: this.state.myData[10].y, size: 5}
            ]
          });
        })
        .catch(err => this.setState({ message: err.toString() }));
    }
  render() {
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
              data={this.statemyData}/>
          </XYPlot>
        </div>
      </div>
      <button className="btn-style">Create graph</button>
    </div>
    )
  }
}