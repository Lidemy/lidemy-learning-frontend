import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
const { TextArea } = Input;

const TemplateModal = ({ visible, onCancel, onConfirm }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleConfirm = () => {
    onConfirm({
      name,
      content
    });
    onCancel();
  };

  useEffect(
    () => {
      setName("");
      setContent("");
    },
    [visible]
  );

  return (
    <Modal
      title="新增模板"
      okText="新增"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={onCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>模板名稱：</label>
        <Input onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div className="mb2">
        <label>模板內容：</label>
        <TextArea
          rows={5}
          onChange={e => setContent(e.target.value)}
          value={content}
        />
      </div>
    </Modal>
  );
};

export default TemplateModal;
