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
  const [userId, setUserId] = useState(null);
  const [visible, setVisible] = useState(false);

  const {
    homeworks,
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

  useEffect(
    () => {
      getHomeworks({
        UserId: userId
      });
    },
    [userId, isLoadingCreateHomework]
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
            scroll={{ x: 1280, y: 1080 }}
            rowKey="id"
            pagination={{
              defaultPageSize: 10
            }}
          />
        </TabPane>
        <TabPane tab="我的作業" key="me">
          {isLoadingGetHomeworks && <Loading />}
          <Table
            columns={hwColumns}
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

export default Homeworks;
