import React, { useState } from "react";
import { Modal, Input } from "antd";

const BadgeModal = ({ visible, onCancel, onConfirm }) => {
  const init = {
    name: "",
    link: ""
  };
  const [eachEntry, setEachEntry] = useState(init);
  const { name, link } = eachEntry;

  const handleConfirm = () => {
    onConfirm({
      ...eachEntry
    });
    onCancel();
  };

  const handleCancel = () => {
    setEachEntry({
      ...init
    });
    onCancel();
  };

  const handleInputChange = evt => {
    setEachEntry({
      ...eachEntry,
      [evt.target.name]: evt.target.value
    });
  };

  return (
    <Modal
      title="新增標籤"
      okText="送出"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>Badge 名稱：</label>
        <Input onChange={handleInputChange} name="name" value={name} />
      </div>
      <div className="mb2">
        <label>Badge 字串：</label>
        <Input onChange={handleInputChange} name="link" value={link} />
      </div>
    </Modal>
  );
};

export default BadgeModal;
