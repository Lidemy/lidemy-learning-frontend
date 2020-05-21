import React, { useEffect, useState } from "react";
import { Table, Typography, Tabs, Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import columns from "../common/columns";
import Loading from "../loading";
import { Actions } from "../../actions";

const { Title } = Typography;
const { TabPane } = Tabs;

const Reviews = () => {
  const [userId] = useState(null);
  const initParams = {
    sort: "id",
    order: "ASC",
    page: 1
  };
  const [params, setParams] = useState(initParams);

  const {
    homeworks,
    count,
    isLoadingGetTAHomeworks,
    isLoadingUpdateHomework,
    user
  } = useSelector(state => ({
    ...state.homework,
    ...state.auth
  }));
  const dispatch = useDispatch();

  const changeTab = key => {
    switch (key) {
      case "all":
        setParams({
          ...initParams
        });
        break;
      case "me":
        setParams({
          ...initParams,
          TAId: user.id
        });
        break;
      default:
        setParams({
          ...initParams
        });
        break;
    }
  };

  const getHomeworks = payload => dispatch(Actions.GET_HOMEWORKS(payload));
  const likeHomework = id => dispatch(Actions.LIKE_HOMEWORK(id));
  const achieveHomework = id => dispatch(Actions.ACHIEVE_HOMEWORK(id));
  const toggleTA = () => dispatch(Actions.TOGGLE_TA_STATUS());

  const allColumns = [
    ...columns,
    {
      title: "動作",
      render: row => (
        <span>
          <a onClick={onLikeHomework} data-id={row.id}>
            {row.isLike ? "取消給讚" : "給讚"}
          </a>
        </span>
      )
    }
  ];

  const myColumns = [
    ...columns,
    {
      title: "動作",
      render: row => {
        return (
          <span>
            <a onClick={onAchieveHomework} className="mr3" data-id={row.id}>
              {row.isAchieve ? "取消批改" : "完成批改"}
            </a>
            <a onClick={onLikeHomework} data-id={row.id}>
              {row.isLike ? "取消給讚" : "給讚"}
            </a>
          </span>
        );
      }
    }
  ];

  const onAchieveHomework = evt => {
    achieveHomework(evt.currentTarget.dataset.id);
  };

  const onLikeHomework = evt => {
    likeHomework(evt.currentTarget.dataset.id);
  };

  const onToggleStatus = () => {
    toggleTA();
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setParams({
      sort: sorter.field,
      order: sorter.order === "descend" ? "DESC" : "ASC",
      page: pagination.current,
      ...(filters.isLike &&
        filters.isLike.length > 0 && { like: JSON.stringify(filters.isLike) }),
      ...(filters.isAchieve &&
        filters.isAchieve.length > 0 && {
          achieve: JSON.stringify(filters.isAchieve)
        }),
      ...(filters.week &&
        filters.week.length > 0 && { week: JSON.stringify(filters.week) }),
      ...(filters.TAId &&
        filters.TAId.length > 0 && { ta: JSON.stringify(filters.TAId) }),
      ...(filters.UserId &&
        filters.UserId.length > 0 && {
          student: JSON.stringify(filters.UserId)
        })
    });
  };

  useEffect(
    () => {
      getHomeworks(params);
    },
    [userId, params, isLoadingUpdateHomework]
  );

  return (
    <div>
      <Title level={3}>批閱列表</Title>
      <div>
        <span className="mr3">休息狀態</span>
        <Switch
          onChange={onToggleStatus}
          checked={user.status === "active" ? false : true}
          checkedChildren="開"
          unCheckedChildren="關"
        />
        <br />
      </div>
      <Tabs defaultActiveKey="all" onChange={changeTab}>
        <TabPane tab="所有批閱" key="all">
          {isLoadingGetTAHomeworks && <Loading />}
          <Table
            columns={allColumns}
            dataSource={homeworks}
            scroll={{ x: 1280, y: 1080 }}
            rowKey="id"
            onChange={handleTableChange}
            pagination={{
              total: count
            }}
          />
        </TabPane>
        <TabPane tab="我的批閱" key="me">
          {isLoadingGetTAHomeworks && <Loading />}
          <Table
            columns={myColumns}
            dataSource={homeworks}
            scroll={{ x: 1280, y: 1080 }}
            rowKey="id"
            onChange={handleTableChange}
            pagination={{
              total: count
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reviews;
