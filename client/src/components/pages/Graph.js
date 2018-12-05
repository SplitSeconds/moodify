import React, { Component } from "react";
import "../../styles/index.css";
import api from "../../api";
import { XYPlot, LineMarkSeries } from "react-vis";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      isHidde: true,
      myData: [
        { x: 0, y: "", size: "" },
        { x: 1, y: "", size: "" },
        { x: 2, y: "", size: "" },
        { x: 3, y: "", size: "" },
        { x: 4, y: "", size: "" },
        { x: 5, y: "", size: "" },
        { x: 6, y: "", size: "" },
        { x: 7, y: "", size: "" },
        { x: 8, y: "", size: "" },
        { x: 9, y: "", size: "" },
        { x: 10, y: "", size: "" },
        { x: 12, y: "", size: "" },
        { x: 13, y: "", size: "" },
        { x: 14, y: "", size: "" },
        { x: 15, y: "", size: "" },
        { x: 16, y: "", size: "" },
        { x: 17, y: "", size: "" },
        { x: 18, y: "", size: "" },
        { x: 19, y: "", size: "" }
      ]
    };
    //console.log("MY DATA 2", this.state.myData)
    //console.log("Name", this.state.name)

  }
  showName() { 
    this.setState({
      isHidden: false,
      name: this.state.name
    });
  }
  componentDidMount() {
    api
      .getMyRecentlyPlayedTracks()
      .then(data => {
        console.log("FROM BACKEND", data);
        console.log("ALL SONG INFOS", data[data.length - 2]);
        console.log("ONE SONG INFO YAY", data[data.length - 2][5].danceability);
       
        for (let i = 0; i < data[data.length - 2].length; i++) {
          this.state.myData[i].y =
            ((data[data.length - 2][i].danceability + data[data.length - 2][i].valence + data[data.length - 2][i].energy) / 3) *
            10;

          this.state.myData[i].size = Math.round(data[data.length - 2][i].tempo / 15);
          this.state.name = data[1][i]
        }
        this.setState({
          name: this.state.name,
          myData: [
            {
              x: 0,
              y: this.state.myData[1].y,
              size: this.state.myData[1].size
            },
            {
              x: 1,
              y: this.state.myData[2].y,
              size: this.state.myData[2].size
            },
            {
              x: 2,
              y: this.state.myData[3].y,
              size: this.state.myData[3].size
            },
            {
              x: 3,
              y: this.state.myData[4].y,
              size: this.state.myData[4].size
            },
            {
              x: 4,
              y: this.state.myData[5].y,
              size: this.state.myData[5].size
            },
            {
              x: 5,
              y: this.state.myData[6].y,
              size: this.state.myData[6].size
            },
            {
              x: 6,
              y: this.state.myData[7].y,
              size: this.state.myData[7].size
            },
            {
              x: 7,
              y: this.state.myData[8].y,
              size: this.state.myData[8].size
            },
            {
              x: 8,
              y: this.state.myData[9].y,
              size: this.state.myData[9].size
            },
            {
              x: 9,
              y: this.state.myData[10].y,
              size: this.state.myData[10].size
            },
            {
              x: 10,
              y: this.state.myData[11].y,
              size: this.state.myData[11].size
            },
            {
              x: 11,
              y: this.state.myData[12].y,
              size: this.state.myData[12].size
            },
            {
              x: 12,
              y: this.state.myData[13].y,
              size: this.state.myData[13].size
            },
            {
              x: 13,
              y: this.state.myData[14].y,
              size: this.state.myData[14].size
            },
            {
              x: 14,
              y: this.state.myData[15].y,
              size: this.state.myData[15].size
            },
            {
              x: 15,
              y: this.state.myData[16].y,
              size: this.state.myData[16].size
            },
            {
              x: 16,
              y: this.state.myData[17].y,
              size: this.state.myData[17].size
            },
            {
              x: 17,
              y: this.state.myData[18].y,
              size: this.state.myData[18].size
            },
            {
              x: 18,
              y: this.state.myData[19].y,
              size: this.state.myData[19].size
            },
            {
              x: 19,
              y: this.state.myData[20].y,
              size: this.state.myData[20].size
            }
          ]
        });
      })
      //console.log("UPDATE" + this.state.myData)
      .catch(err => this.setState({ message: err.toString() }));
  }
  render() {
    return (
      <div className="graph">
        <div className="graph-box">
          <XYPlot height={300} width={355}>
            {/* <HorizontalGridLines style={{ stroke: "#B7E9ED" }} />
              <VerticalGridLines style={{ stroke: "#B7E9ED" }} /> */}
            <LineMarkSeries
              stroke="8A2BE2"
              color="5F4B8B"
              opacity="0.8"
              fill="5F4B8B"
              style={{ strokeLinejoin: "round", strokeWidth: 2 }}
              data={this.state.myData}
              onValueClick={(myData, name) => {
                console.log(this.state.name);
                <div>
                  Name:  {this.state.name}
                </div>
               
                //this.showName(myData, name);
              }}
            />
          </XYPlot>
        </div>
      </div>
    );
  }
}
