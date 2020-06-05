import React from "react";
import moment from "moment";
import { LikeOutlined, CheckOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 80,
    render: (id, row) => id,
    sorter: true,
    defaultSortOrder: "descend"
  },
  {
    title: "週次",
    width: 100,
    dataIndex: "week",
    render: (week, row) => (
      <a href={row.prUrl} target="_blank" rel="noopener noreferrer">
        week{week}
      </a>
    ),
    sorter: true,
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
      <a
        href={`/users/${row.user.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
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
    filtered: true,
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
    filtered: true,
    render: isAchieve => isAchieve && <CheckOutlined />
  },
  {
    title: "建立時間",
    dataIndex: "createdAt",
    render: createdAt => <div>{moment(createdAt).format("YYYY-MM-DD")}</div>,
    sorter: true,
    defaultSortOrder: "descend"
  }
];

export default columns;
