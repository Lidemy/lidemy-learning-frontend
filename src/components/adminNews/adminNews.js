/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Modal, Button, Table, message } from "antd";
import moment from "moment";
import NewsModal from "./newsModal";

const confirm = Modal.confirm;
class AdminNews extends Component {
  state = {
    showModal: false,
    modalMode: "create",
    instance: null
  };

  componentDidMount() {
    this.props.getNewsList();
  }

  componentDidUpdate(prevProps) {
    const {
      isLoadingCreateNews,
      isLoadingDeleteNews,
      isLoadingUpdateNews,
      getNewsList
    } = this.props;
    if (
      prevProps.isLoadingDeleteNews !== isLoadingDeleteNews &&
      !isLoadingDeleteNews
    ) {
      message.success("刪除成功");
      getNewsList();
    }

    if (
      prevProps.isLoadingCreateNews !== isLoadingCreateNews &&
      !isLoadingCreateNews
    ) {
      message.success("新增成功");
      getNewsList();
    }

    if (
      prevProps.isLoadingUpdateNews !== isLoadingUpdateNews &&
      !isLoadingUpdateNews
    ) {
      message.success("更新成功");
      getNewsList();
    }
  }

  handleDelete = record => {
    const { deleteNews } = this.props;
    confirm({
      title: "你確定要刪除嗎？",
      content: record.title,
      onOk() {
        deleteNews(record.id);
      }
    });
  };

  handleDetails = record => {
    this.setState({
      showModal: true,
      modalMode: "update",
      instance: record
    });
  };

  handleCreate = () => {
    this.setState({
      showModal: true,
      modalMode: "create"
    });
  };

  handleConfirm = data => {
    const { modalMode, instance } = this.state;
    const { createNews, updateNews } = this.props;
    if (modalMode === "create") {
      createNews(data);
    } else {
      updateNews(instance.id, data);
    }
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      instance: null
    });
  };

  getColumns = () => {
    const columns = [
      {
        title: "標題",
        dataIndex: "title",
        key: "title",
        render: (text, record) => (
          <a
            onClick={() => {
              this.handleDetails(record);
            }}
          >
            {text}
          </a>
        )
      },
      {
        title: "發布時間",
        dataIndex: "createdAt",
        key: "createdAt",
        render: time => moment(time).format("LLLL")
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a
              onClick={() => {
                this.handleDelete(record);
              }}
            >
              刪除
            </a>
          </span>
        )
      }
    ];
    return columns;
  };

  render() {
    const { newsList } = this.props;
    const { showModal, instance } = this.state;
    return (
      <div>
        <NewsModal
          onConfirm={this.handleConfirm}
          onCancel={this.handleClose}
          visible={showModal}
          instance={instance}
        />
        <Button type="primary" onClick={this.handleCreate}>
          新增最新消息
        </Button>
        <div className="mt2">
          <Table
            columns={this.getColumns()}
            dataSource={newsList}
            rowKey="id"
          />
        </div>
      </div>
    );
  }
}

export default AdminNews;
