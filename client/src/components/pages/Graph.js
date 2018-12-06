import React, { Component } from "react";
import "../../styles/index.css";
import 'react-vis/dist/style.css';
import api from "../../api";
import { XYPlot, LineMarkSeries, HorizontalGridLines, XAxis, YAxis  } from "react-vis";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      name: "",
      hoveredMark: false,
      pop: "",
      myData: [
        { x: 1, y: "", size: "", title: ""},
        { x: 2, y: "", size: "", title: ""},
        { x: 3, y: "", size: "", title: ""},
        { x: 4, y: "", size: "", title: ""},
        { x: 5, y: "", size: "", title: ""},
        { x: 6, y: "", size: "", title: ""},
        { x: 7, y: "", size: "", title: ""},
        { x: 8, y: "", size: "", title: ""},
        { x: 9, y: "", size: "", title: ""},
        { x: 10, y: "", size: "", title: ""},
        { x: 11, y: "", size: "", title: ""},
        { x: 12, y: "", size: "", title: ""},
        { x: 13, y: "", size: "", title: ""},
        { x: 14, y: "", size: "", title: ""},
        { x: 15, y: "", size: "", title: ""},
        { x: 16, y: "", size: "", title: ""},
        { x: 17, y: "", size: "", title: ""},
        { x: 18, y: "", size: "", title: ""},
        { x: 19, y: "", size: "", title: ""},
        { x: 20, y: "", size: "", title: ""}
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
      .then(data => {
        // console.log("FROM BACKEND", data);
        // console.log("NAME", data[1]);
        // console.log("ALL SONG INFOS", data[data.length - 2]);
        // console.log("ONE SONG INFO YAY", data[data.length - 2][5].danceability);

        for (let i = 0; i < data[data.length - 2].length; i++) {
          this.state.myData[i].y =
            ((data[data.length - 2][i].danceability +
              data[data.length - 2][i].valence +
              data[data.length - 2][i].energy) /
              3) *
            10;

          this.state.myData[i].size = Math.round(
            data[data.length - 2][i].tempo / 15
          );
          this.state.myData[i].title = data[1][i];
        }
        this.setState({
          name: this.state.name,

          myData: [
            {
              x: 1,
              y: this.state.myData[1].y,
              size: this.state.myData[1].size,
              title: this.state.myData[1].title
            },
            {
              x: 2,
              y: this.state.myData[2].y,
              size: this.state.myData[2].size,
              title: this.state.myData[2].title
            },
            {
              x: 3,
              y: this.state.myData[3].y,
              size: this.state.myData[3].size,
              title: this.state.myData[3].title
            },
            {
              x: 4,
              y: this.state.myData[4].y,
              size: this.state.myData[4].size,
              title: this.state.myData[4].title
            },
            {
              x: 5,
              y: this.state.myData[5].y,
              size: this.state.myData[5].size,
              title: this.state.myData[5].title
            },
            {
              x: 6,
              y: this.state.myData[6].y,
              size: this.state.myData[6].size,
              title: this.state.myData[6].title
            },
            {
              x: 7,
              y: this.state.myData[7].y,
              size: this.state.myData[7].size,
              title: this.state.myData[7].title
            },
            {
              x: 8,
              y: this.state.myData[8].y,
              size: this.state.myData[8].size,
              title: this.state.myData[8].title
            },
            {
              x: 9,
              y: this.state.myData[9].y,
              size: this.state.myData[9].size,
              title: this.state.myData[9].title
            },
            {
              x: 10,
              y: this.state.myData[10].y,
              size: this.state.myData[10].size,
              title: this.state.myData[10].title
            },
            {
              x: 11,
              y: this.state.myData[11].y,
              size: this.state.myData[11].size,
              title: this.state.myData[11].title
            },
            {
              x: 12,
              y: this.state.myData[12].y,
              size: this.state.myData[12].size,
              title: this.state.myData[12].title
            },
            {
              x: 13,
              y: this.state.myData[13].y,
              size: this.state.myData[13].size,
              title: this.state.myData[13].title
            },
            {
              x: 14,
              y: this.state.myData[14].y,
              size: this.state.myData[14].size,
              title: this.state.myData[14].title
            },
            {
              x: 15,
              y: this.state.myData[15].y,
              size: this.state.myData[15].size,
              title: this.state.myData[15].title
            },
            {
              x: 16,
              y: this.state.myData[16].y,
              size: this.state.myData[16].size,
              title: this.state.myData[16].title
            },
            {
              x: 17,
              y: this.state.myData[17].y,
              size: this.state.myData[17].size,
              title: this.state.myData[17].title
            },
            {
              x: 18,
              y: this.state.myData[18].y,
              size: this.state.myData[18].size,
              title: this.state.myData[18].title
            },
            {
              x: 19,
              y: this.state.myData[19].y,
              size: this.state.myData[19].size,
              title: this.state.myData[19].title
            },
            {
              x: 20,
              y: this.state.myData[20].y,
              size: this.state.myData[20].size,
              title: this.state.myData[20].title
            }
          ]
        });
      })
      //console.log("UPDATE" + this.state.myData)
      .catch(err => this.setState({ message: err.toString() }));
  }
  render() {
    return (
      <div className="graph-container">
      <div>
        {this.state.pop}
      </div>

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
