import React, { useState} from 'react';
import {XYPlot, VerticalBarSeriesCanvas,VerticalBarSeries,VerticalGridLines,HorizontalGridLines,XAxis,YAxis} from 'react-vis';

export function Home(){

  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];
  const [useCanvas,setUseCanvas]=useState(false);

  const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];
  const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

  return(
    <div>
      <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <BarSeries data={blueData} />
      </XYPlot>
    </div>
  )
}
