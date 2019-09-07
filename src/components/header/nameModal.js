import React, { Component } from "react";
import { Modal, Input } from "antd";

class NameModal extends Component {
  state = {
    nickname: ""
  };

  componentDidUpdate = prevProps => {
    const { instance } = this.props;
    if (prevProps.instance !== instance && instance) {
      this.setState({
        nickname: instance.nickname
      });
    }
  };

  handleCancel = () => {
    const { onCancel, instance } = this.props;
    this.setState(
      {
        nickname: instance.nickname
      },
      onCancel
    );
  };

  handleConfirm = () => {
    const { onConfirm, onCancel, instance } = this.props;
    onConfirm({
      ...instance,
      nickname: this.state.nickname
    });
    onCancel();
  };

  onNameChange = e => {
    this.setState({
      nickname: e.target.value
    });
  };

  render() {
    const { nickname } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        title="修改暱稱"
        okText="送出"
        cancelText="取消"
        onOk={this.handleConfirm}
        onCancel={this.handleCancel}
        visible={visible}
      >
        <div>
          <Input onChange={this.onNameChange} value={nickname} />
        </div>
      </Modal>
    );
  }
}

export default NameModal;
