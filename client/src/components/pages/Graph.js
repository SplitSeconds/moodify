import React, { Component } from "react";
import "../../styles/index.css";
import api from "../../api";
import {
  XYPlot,
  MarkSeries,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines
} from "react-vis";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: [
        { x: 0, y: "", size: 5 },
        { x: 1, y: "", size: 5 },
        { x: 2, y: "", size: 5 },
        { x: 3, y: "", size: 5 },
        { x: 4, y: "", size: 5 },
        { x: 5, y: "", size: 5 },
        { x: 6, y: "", size: 5 },
        { x: 7, y: "", size: 5 },
        { x: 8, y: "", size: 5 },
        { x: 9, y: "", size: 5 }
      ]
    };
    console.log("MY DATA 2", this.state.myData)
  }
  
  componentDidMount() {
    api
      .getMyRecentlyPlayedTracks()
      .then(data => {
        //console.log("FROM BACKEND", data);
        //console.log("FROM BACKEND", data[1]);
        // console.log("GRAPHDATA", data.audio_features[0].danceability);
        // console.log("DATALENGTH", data.audio_features.length);
        //this.state.myData[i].y= 0
        for (let i = 0; i < data.length; i++) {
          this.state.myData[i].y =
            ((data[i].danceability +
              data[i].valence +
              data[i].energy) /
              3) *
            10;
        }
        console.log("MY DATA 1", this.state.myData)
        this.setState({
          //let y1 = item[0]audio_features.danceability + item[0]audio_features.valence + item[0]audio_features.energy
          myData: [
            { x: 0, y: this.state.myData[1].y, size: 5 },
            { x: 1, y: this.state.myData[2].y, size: 5 },
            { x: 2, y: this.state.myData[3].y, size: 5 },
            { x: 3, y: this.state.myData[4].y, size: 5 },
            { x: 4, y: this.state.myData[5].y, size: 5 },
            { x: 5, y: this.state.myData[6].y, size: 5 },
            { x: 6, y: this.state.myData[7].y, size: 5 },
            { x: 7, y: this.state.myData[8].y, size: 5 },
            { x: 8, y: this.state.myData[9].y, size: 5 },
            { x: 9, y: this.state.myData[10].y, size: 5 }
          ]
        });
        //console.log("MY DATA 2", this.state.myData)
      })
      //console.log(this.state.myData)
      .catch(err => this.setState({ message: err.toString() }));
      
  }
  render() {
    return (
      <div>
        <div className="graph">
          <div className="graph-box">
            <XYPlot height={300} width={300}>
              <VerticalGridLines />
              <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
              <VerticalGridLines style={{ stroke: "#B7E9ED" }} />
              <LineSeries 
              stroke="blue" 
              style={{strokeLinejoin: 'round', strokeWidth: 2}} 
              data={this.state.myData} /> 
      
              {/* // <MarkSeries */}
              {/* //   className="mark-series-example"
              //   color="white"
              //   opacity="0.5"
              //   sizeRange={[5, 5]}
              //   data={this.state.myData}
              // /> */}
            </XYPlot>
          </div>
        </div>
        <button className="btn-style">Create graph</button>
      </div>
    );
  }
}
