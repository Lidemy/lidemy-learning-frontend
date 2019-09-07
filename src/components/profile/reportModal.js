import React, { Component } from "react";
import { Modal } from "antd";
import Editor from "../editor";

class ReportModal extends Component {
  state = {
    content: ""
  };

  componentDidUpdate = prevProps => {
    const { instance } = this.props;
    if (prevProps.instance !== instance && instance) {
      this.setState({
        content: instance.content
      });
    }
  };

  handleCancel = () => {
    const { onCancel, instance } = this.props;
    this.setState(
      {
        content: instance.content
      },
      onCancel
    );
  };

  handleConfirm = () => {
    const { onConfirm, onCancel, instance } = this.props;
    onConfirm({
      ...instance,
      content: this.state.content
    });
    onCancel();
  };

  onContentChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  render() {
    const { content } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        title="編輯進度報告"
        okText="送出"
        cancelText="取消"
        onOk={this.handleConfirm}
        onCancel={this.handleCancel}
        visible={visible}
      >
        <div>
          <Editor onChange={this.onContentChange} value={content} />
        </div>
      </Modal>
    );
  }
}

export default ReportModal;
