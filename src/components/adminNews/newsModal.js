import React, { Component } from "react";
import { Modal, Input } from "antd";
import Editor from "../editor";

class NewsModal extends Component {
  state = {
    title: "",
    content: ""
  };

  componentDidUpdate = prevProps => {
    const { instance } = this.props;
    if (prevProps.instance !== instance && instance) {
      this.setState({
        title: instance.title,
        content: instance.content
      });
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState(
      {
        title: "",
        content: ""
      },
      onCancel
    );
  };

  handleConfirm = () => {
    const { onConfirm, onCancel } = this.props;
    onConfirm({
      title: this.state.title,
      content: this.state.content
    });
    onCancel();
  };

  onContentChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  render() {
    const { content, title } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        title="最新消息"
        okText="送出"
        cancelText="取消"
        onOk={this.handleConfirm}
        onCancel={this.handleCancel}
        visible={visible}
      >
        <div>
          <Input onChange={this.onTitleChange} value={title} />
          <Editor onChange={this.onContentChange} value={content} />
        </div>
      </Modal>
    );
  }
}

export default NewsModal;
