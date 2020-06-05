import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Tabs } from "antd";
import HomeworkModal from "./homeworkModal";
import Loading from "../loading";
import columns from "../common/columns";
import search from "../common/search";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions";

const { Title } = Typography;
const { TabPane } = Tabs;

const Homeworks = () => {
  const initParams = {
    sort: "id",
    order: "ASC",
    page: 1
  };
  const [userId, setUserId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState(initParams);
  const {
    homeworks,
    count,
    isLoadingCreateHomework,
    isLoadingGetHomeworks,
    user
  } = useSelector(state => ({
    ...state.homework,
    ...state.auth
  }));
  const dispatch = useDispatch();
  const getHomeworks = payload => dispatch(Actions.GET_HOMEWORKS(payload));
  const createHomework = payload => dispatch(Actions.CREATE_HOMEWORK(payload));

  const changeTab = key => {
    switch (key) {
      case "all":
        setUserId(0);
        break;
      case "me":
        setParams({
          ...initParams,
          UserId: userId
        });
        setUserId(user.id);
        break;
      default:
        setUserId(0);
        break;
    }
  };

  const closeModal = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCreate = payload => {
    createHomework(payload);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = clearFilters => {
    clearFilters();
  };

  const hwColumns = [...columns];

  hwColumns[1] = {
    ...hwColumns[1],
    ...search(null, "week", handleSearch, handleReset)
  };

  hwColumns[2] = {
    ...hwColumns[2],
    ...search("ta", "nickname", handleSearch, handleReset)
  };

  hwColumns[3] = {
    ...hwColumns[3],
    ...search("user", "nickname", handleSearch, handleReset)
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setParams({
      sort: sorter.field,
      order: sorter.order === "descend" ? "DESC" : "ASC",
      page: pagination.current,
      like: filters.isLike,
      achieve: filters.isAchieve,
      week: filters.week,
      ta: filters.TAId,
      student: filters.UserId
    });
  };

  useEffect(
    () => {
      getHomeworks(params);
    },
    [userId, params, isLoadingCreateHomework]
  );

  return (
    <div>
      <HomeworkModal
        visible={visible}
        onCancel={closeModal}
        onConfirm={handleCreate}
      />
      <Title level={3}>作業列表</Title>
      <Button onClick={showModal}>新增作業</Button>
      <Tabs defaultActiveKey="all" onChange={changeTab}>
        <TabPane tab="所有作業" key="all">
          {isLoadingGetHomeworks && <Loading />}
          <Table
            columns={hwColumns}
            dataSource={homeworks}
            scroll={{ x: "100%", y: 1080 }}
            rowKey="id"
            onChange={handleTableChange}
            pagination={{
              total: count
            }}
          />
        </TabPane>
        <TabPane tab="我的作業" key="me">
          {isLoadingGetHomeworks && <Loading />}
          <Table
            columns={hwColumns}
            dataSource={homeworks}
            scroll={{ x: "100%", y: 1080 }}
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

export default Homeworks;
