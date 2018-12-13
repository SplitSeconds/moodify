import React, { Component } from "react";
import "../../styles/index.css";
import "react-vis/dist/style.css";
import api from "../../api";
import {
  XYPlot,
  LineMarkSeries,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      name: "",
      hoveredMark: false,
      pop: "",
      myData: [
        { x: 1, y: "", size: "", title: "" },
        { x: 2, y: "", size: "", title: "" },
        { x: 3, y: "", size: "", title: "" },
        { x: 4, y: "", size: "", title: "" },
        { x: 5, y: "", size: "", title: "" },
        { x: 6, y: "", size: "", title: "" },
        { x: 7, y: "", size: "", title: "" },
        { x: 8, y: "", size: "", title: "" },
        { x: 9, y: "", size: "", title: "" },
        { x: 10, y: "", size: "", title: "" },
        { x: 11, y: "", size: "", title: "" },
        { x: 12, y: "", size: "", title: "" },
        { x: 13, y: "", size: "", title: "" },
        { x: 14, y: "", size: "", title: "" },
        { x: 15, y: "", size: "", title: "" },
        { x: 16, y: "", size: "", title: "" },
        { x: 17, y: "", size: "", title: "" },
        { x: 18, y: "", size: "", title: "" },
        { x: 19, y: "", size: "", title: "" },
        { x: 20, y: "", size: "", title: "" }
      ]
    };
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  componentDidMount() {
    api
      .getMyRecentlyPlayedTracks()
      .then(({ audioFeatures, trackNames }) => {
        // console.log("FROM BACKEND", data);
        // console.log("NAME", data[1]);
        // console.log("ALL SONG INFOS", audioFeatures);
        // console.log("ONE SONG INFO YAY", audioFeatures[5].danceability);

        for (let i = 0; i < audioFeatures.length; i++) {
          this.state.myData[i].y =
            ((audioFeatures[i].danceability +
              audioFeatures[i].valence +
              audioFeatures[i].energy) /
              3) *
            10;

          this.state.myData[i].size = Math.round(audioFeatures[i].tempo / 15);
          this.state.myData[i].title = trackNames[i];
        }
        this.setState({
          name: this.state.name,

          myData: this.state.myData(point => ({
            x: point.x,
            y: this.state.myData[point.x].y,
            size: this.state.myData[point.x].size,
            title: this.state.myData[point.x].title
          }))
        });
      })
      //console.log("UPDATE" + this.state.myData)
      .catch(err => this.setState({ message: err.toString() }));
  }
  render() {
    return (
      <div className="graph-container">
        <div>{this.state.pop}</div>

        <div className="graph">
          <div className="graph-box">
            <XYPlot height={230} width={350}>
              <XAxis />
              <YAxis />
              <LineMarkSeries
                stroke="412faf"
                color="5F4B8B"
                opacity="0.8"
                fill="5F4B8B"
                style={{ strokeLinejoin: "round", strokeWidth: 2 }}
                data={this.state.myData}
                onValueClick={(d, event) => {
                  console.log("d", d);
                  let a = d.title;
                  a = "mir";
                  this.setState({
                    pop: "Songtitle: " + d.title
                  });
                }}
              >
                <HorizontalGridLines />
              </LineMarkSeries>
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
}
