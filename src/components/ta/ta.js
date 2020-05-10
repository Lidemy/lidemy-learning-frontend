import React, { useEffect, useState } from "react";
import { Table, Typography, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions";

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

const TA = () => {
  const [userId] = useState(null);
  const { TAList } = useSelector(state => ({
    ...state.user,
    ...state.auth
  }));
  const dispatch = useDispatch();

  const getTAs = () => dispatch(Actions.GET_TA_LIST());
  useEffect(
    () => {
      getTAs();
    },
    [userId]
  );

  return (
    <div>
      <Title level={3}>助教列表</Title>
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
