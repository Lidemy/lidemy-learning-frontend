import React, { useState, useEffect } from "react";
import { Modal, Input, Tag } from "antd";

const NameModal = ({ visible, instance, onCancel, onConfirm }) => {
  const init = {
    nickname: "",
    slackId: ""
  };
  const [eachEntry, setEachEntry] = useState(init);
  const { nickname, slackId, isTA, isAdmin, isStudent, semester } = eachEntry;

  const handleConfirm = () => {
    onConfirm({
      ...eachEntry
    });
    onCancel();
  };

  const handleCancel = () => {
    setEachEntry({
      ...instance
    });
    onCancel();
  };

  const handleInputChange = evt => {
    setEachEntry({
      ...eachEntry,
      [evt.target.name]: evt.target.value
    });
  };

  useEffect(
    () => {
      setEachEntry({
        ...instance
      });
    },
    [instance]
  );

  return (
    <Modal
      title="個人資料"
      okText="送出"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div class="mb2">
        <label>身份：</label>
        <div>
          {isTA && <Tag color="green">助教</Tag>}
          {isAdmin && <Tag color="red">管理員</Tag>}
          {isStudent && <Tag color="blue">第 {semester} 期學生</Tag>}
        </div>
      </div>
      <div class="mb2">
        <label>更改暱稱：</label>
        <Input onChange={handleInputChange} name="nickname" value={nickname} />
      </div>
      <div class="mb2">
        <label>更改 Slack Id:</label>
        <Input onChange={handleInputChange} name="slackId" value={slackId} />
      </div>
    </Modal>
  );
};

export default NameModal;
