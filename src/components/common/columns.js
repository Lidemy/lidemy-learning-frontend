import React from "react";
import moment from "moment";
import { LikeOutlined, CheckOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    render: (id, row) => id,
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: "descend"
  },
  {
    title: "週次",
    dataIndex: "week",
    render: (week, row) => (
      <a href={row.prUrl} target="_blank" rel="noopener noreferrer">
        week{week}
      </a>
    ),
    sorter: (a, b) => a.week - b.week,
    defaultSortOrder: "descend"
  },
  {
    title: "助教",
    dataIndex: "TAId",
    render: (TAId, row) => (
      <a href={`/users/${TAId}`} target="_blank" rel="noopener noreferrer">
        <Avatar size="small" src={row.ta.picture} />
        <span className="ml2">
          {row.ta.nickname}
          {row.ta.slackId ? `(${row.ta.slackId})` : ``}
        </span>
      </a>
    )
  },
  {
    title: "學生",
    dataIndex: "UserId",
    render: (UserId, row) => (
      <a href={`/users/${UserId}`} target="_blank" rel="noopener noreferrer">
        <Avatar size="small" src={row.user.picture} />
        <span className="ml2">
          {row.user.nickname}
          {row.user.slackId ? `(${row.user.slackId})` : ``}
        </span>
      </a>
    )
  },
  {
    title: "值得參考",
    dataIndex: "isLike",
    align: "center",
    filters: [
      {
        text: "值得參考",
        value: true
      }
    ],
    onFilter: (value, row) => row.isLike === value,
    render: isLike => isLike && <LikeOutlined />
  },
  {
    title: "已批改",
    dataIndex: "isAchieve",
    align: "center",
    filters: [
      {
        text: "已批改",
        value: true
      },
      {
        text: "未批改",
        value: false
      }
    ],
    onFilter: (value, row) => row.isAchieve === value,
    render: isAchieve => isAchieve && <CheckOutlined />
  },
  {
    title: "建立時間",
    dataIndex: "createdAt",
    render: createdAt => <div>{moment(createdAt).format("YYYY-MM-DD")}</div>,
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    defaultSortOrder: "descend"
  }
];

export default columns;
