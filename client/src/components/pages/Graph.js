import React, { Component } from 'react'
import '../../styles/index.css';
import {XYPlot, MarkSeries, VerticalGridLines, HorizontalGridLines } from 'react-vis';


export default class Graph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: '',
      value2: '',
      value3: '',
      playlists: []
    }
  }
  handleClick(e) {
    e.preventDefault()
    let data = {
      value1: this.state.value1,
      value2: this.state.value2,
      value3: this.state.value3,
    }}
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
    const series2 = [
      {x: 0, y: 5},
      {x: 1, y: 3},
      {x: 2, y: 8},
      {x: 3, y: 9},
      {x: 4, y: 4},
      {x: 5, y: 5},
      {x: 6, y: 1},
      {x: 7, y: 7},
      {x: 8, y: 8},
      {x: 9, y: 0}
    ];
    return (  
      <div>

      
      <div className="graph">

<XYPlot height={200} width={200}>
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
      <button className="btn-style">Create graph</button>
      </div>
    )
  }
}