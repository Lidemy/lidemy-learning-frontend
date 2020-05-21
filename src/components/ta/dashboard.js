import React, { useState } from "react";
import * as d3 from "d3";

const totalWeek = 24;
const width = 960;
const height = 140;
const margin = 20;

const Rect = ({ item, idx, xScale, yScale }) => {
  const [isShow, setIsShow] = useState(false);
  const rectWidth = 20;

  const handleTipShow = () => {
    setIsShow(true);
  };
  const handleTipClose = () => {
    setIsShow(false);
  };

  return (
    <g data-id={idx} onMouseOver={handleTipShow} onMouseOut={handleTipClose}>
      <rect
        fill={item.isAchieve ? "#c33839" : "#1696fa"}
        x={xScale(item.week) - margin}
        y={height - margin - yScale(item.homeworkCount)}
        width={rectWidth}
        height={yScale(item.homeworkCount)}
      />
      {isShow && (
        <text
          fill="black"
          x={xScale(item.week) - margin + rectWidth}
          y={height - margin - yScale(item.homeworkCount)}
        >
          {item.isAchieve ? "已改" : "未改"} : {item.homeworkCount}
        </text>
      )}
    </g>
  );
};

const Dashboard = ({ data }) => {
  const maxArr = [...Array(totalWeek).fill(0)];
  data.forEach(item => (maxArr[item.week - 1] += item.homeworkCount));
  const yExtent = [0, Math.max.apply(Math, maxArr)];
  const xScale = d3
    .scaleLinear()
    .domain([0, totalWeek])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain(yExtent)
    .range([0, height]);
  const yGrid =
    yExtent[1] < 5
      ? yExtent
      : [...Array(5).keys()].map(num => (yExtent[1] / 5) * num);

  return (
    <div className="flex-ns flex-column dn w-100 ">
      <div className="flex w-100">
        <div className="mr2">
          <span
            className="dib v-mid br4 h1 w1 mr2"
            style={{
              background: "#1696fa"
            }}
          />
          <span className="v-mid">已批改</span>
        </div>
        <div>
          <span
            className="dib v-mid br4 h1 w1 mr2"
            style={{
              background: "#c33839"
            }}
          />
          <span className="v-mid">未批改</span>
        </div>
      </div>
      <div className="ma3 w-90">
        <svg width={width + margin} height={height}>
          {yGrid.map((item, idx) => (
            <g key={idx}>
              <line
                stroke="#e2e2e2"
                x1={0}
                x2={width}
                y1={yScale(item) - margin}
                y2={yScale(item) - margin}
              />
              <text fill="#e2e2e2" x={0} y={height - yScale(item) - margin - 3}>
                {item}
              </text>
            </g>
          ))}
          <line
            stroke="gray"
            x1={0}
            x2={width}
            y1={height - margin}
            y2={height - margin}
          />
          {data.map((item, idx) => (
            <Rect
              key={idx}
              idx={idx}
              item={item}
              xScale={xScale}
              yScale={yScale}
            />
          ))}
          {[...Array(totalWeek).keys()].map((item, idx) => (
            <text
              key={idx}
              fill="black"
              x={xScale(item + 1) - margin}
              y={height}
            >
              w{item + 1}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Dashboard;
