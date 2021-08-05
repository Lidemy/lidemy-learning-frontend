import React, { Component } from "react";
import { Modal, Input } from "antd";
import Editor from "../editor";

class UpdateArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.instance ? props.instance.content : "",
      title: props.instance ? props.instance.title : ""
    };
  }

  componentDidUpdate = prevProps => {
    const { instance } = this.props;
    if (prevProps.instance !== instance && instance) {
      this.setState({
        content: instance.content,
        title: instance.title
      });
    }
  };

  handleCancel = () => {
    const { onCancel, instance } = this.props;
    this.setState(
      {
        content: instance.content,
        title: instance.title
      },
      onCancel
    );
  };

  handleConfirm = () => {
    const { onConfirm, onCancel, instance } = this.props;
    onConfirm({
      ...instance,
      content: this.state.content,
      title: this.state.title
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
        width="80%"
        title="編輯評論"
        okText="送出"
        cancelText="取消"
        onOk={this.handleConfirm}
        onCancel={this.handleCancel}
        visible={visible}
        maskClosable={false}
      >
        <div>
          <Input value={title} onChange={this.onTitleChange} />
          <Editor onChange={this.onContentChange} value={content} />
        </div>
      </Modal>
    );
  }
}

export default UpdateArticleModal;
