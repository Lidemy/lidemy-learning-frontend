import React, { useEffect, useState } from "react";
import { Table, Typography, Tabs, Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import columns from "../common/columns";
import Loading from "../loading";
import { Actions } from "../../actions";

const { Title } = Typography;
const { TabPane } = Tabs;

const Reviews = () => {
  const [userId, setUserId] = useState(null);

  const {
    homeworks,
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
        setUserId(0);
        break;
      case "me":
        setUserId(user.id);
        break;
      default:
        setUserId(0);
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

  useEffect(
    () => {
      getHomeworks({
        TAId: userId
      });
    },
    [userId, isLoadingUpdateHomework]
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
            pagination={{
              defaultPageSize: 10
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
            pagination={{
              defaultPageSize: 10
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Reviews;
