import React, { useEffect, useState } from "react";
import { Table, Typography, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions";
import * as d3 from "d3";

const { Title } = Typography;

const columns = [
  {
    title: "助教",
    dataIndex: "id",
    render: (id, row) => (
      <a href={`/users/${id}`} target="_blank" rel="noopener noreferrer">
        <Avatar size="small" src={row.picture} />
        <span className="ml2">
          {row.nickname}
          {row.slackId ? `(${row.slackId})` : ``}
        </span>
      </a>
    )
  },
  {
    title: "休息狀態",
    dataIndex: "status",
    render: (status, row) => (
      <span>{status === "active" ? "活動中" : "休眠中"}</span>
    )
  },
  {
    title: "最新批改",
    render: row => {
      let hasHomework = false;
      if (row.homeworks && row.homeworks.length > 0) {
        hasHomework = true;
      }
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={hasHomework ? row.homeworks[0].prUrl : "#"}
        >
          {hasHomework ? `week${row.homeworks[0].week}` : "無"}
        </a>
      );
    }
  },
  {
    title: "待批改數量",
    render: row => (
      <p>
        {row.homeworks.filter(homework => homework.isAchieve === false).length}
      </p>
    )
  },
  {
    title: "作業總數",
    render: row => <p>{row.homeworks.length}</p>
  }
];

const Dashboard = ({ data }) => {
  const groupBy = (arr, key) => {
    return arr.reduce((acc, item) => {
      (acc[item[key]] = acc[item[key]] || []).push(item);
      return acc;
    }, {});
  };
  const weekData = groupBy(data, "week");
  const result = [...Array(24).keys()].map(week => ({
    week: week + 1,
    achieve: weekData[week + 1]
      ? weekData[week + 1].filter(item => item.isAchieve).length
      : 0,
    notAchieve: weekData[week + 1]
      ? weekData[week + 1].filter(item => !item.isAchieve).length
      : 0
  }));

  const totalWeek = 24;
  const yExtent = d3.extent(result, d => d.achieve + d.notAchieve);
  const width = 960;
  const height = 140;
  const margin = 20;
  const xScale = d3
    .scaleLinear()
    .domain([0, totalWeek])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain(yExtent)
    .range([0, height]);
  const grid =
    yExtent[1] < 5
      ? yExtent
      : [...Array(5).keys()].map(num => (yExtent[1] / 5) * num);

  return (
    <div className="flex-ns dn w-100 ">
      <div className="flex flex-column w-10">
        <div>
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
        <svg width={width} height={height}>
          {grid.map((item, idx) => (
            <g key={idx}>
              <line
                stroke="#e2e2e2"
                x1={0}
                x2={width}
                y1={yScale(item) - margin}
                y2={yScale(item) - margin}
              />
              <text
                fill="#e2e2e2"
                x={margin}
                y={height - yScale(item) - margin - 3}
              >
                {item}
              </text>
            </g>
          ))}
          {result.map((item, idx) => (
            <g key={idx}>
              <rect
                fill="#1696fa"
                x={xScale(item.week)}
                y={height - margin - yScale(item.achieve)}
                width={20}
                height={yScale(item.achieve)}
              />
              <rect
                fill="#c33839"
                x={xScale(item.week)}
                y={height - margin - yScale(item.achieve + item.notAchieve)}
                width={20}
                height={yScale(item.notAchieve)}
              />
              {item.achieve && (
                <text
                  fill="white"
                  x={xScale(item.week) + 5}
                  y={height - margin - yScale(item.achieve / 2)}
                >
                  {item.achieve}
                </text>
              )}
              {item.notAchieve && (
                <text
                  fill="white"
                  x={xScale(item.week) + 5}
                  y={
                    height -
                    margin -
                    yScale((item.achieve + item.notAchieve) / 2)
                  }
                >
                  {item.notAchieve}
                </text>
              )}
              <text fill="gray" x={xScale(item.week)} y={height}>
                w{item.week}
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
        </svg>
      </div>
    </div>
  );
};

const TA = () => {
  const [userId] = useState(null);
  const { TAList, homeworks } = useSelector(state => ({
    ...state.user,
    ...state.homework,
    ...state.auth
  }));
  const dispatch = useDispatch();

  const getTAs = () => dispatch(Actions.GET_TA_LIST());
  const getHomeworks = payload => dispatch(Actions.GET_HOMEWORKS(payload));

  useEffect(
    () => {
      getTAs();
      getHomeworks();
    },
    [userId]
  );

  return (
    <div>
      <Title level={3}>助教列表</Title>
      <Dashboard data={homeworks} />
      <Table
        columns={columns}
        dataSource={TAList}
        scroll={{ x: 1280, y: 1080 }}
        rowKey="id"
        pagination={{
          defaultPageSize: 10
        }}
      />
    </div>
  );
};

export default TA;
