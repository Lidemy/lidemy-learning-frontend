import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

const NoteModal = ({ visible, onCancel, onConfirm }) => {
  const init = {
    title: "",
    link: "",
  };
  const [eachEntry, setEachEntry] = useState(init);
  const [errMsg, setErr] = useState("");
  const { title, link } = eachEntry;

  useEffect(() => {
    setEachEntry({
      ...init,
    });
  }, [visible]);

  const handleConfirm = () => {
    if (link && title) {
      onConfirm({
        ...eachEntry,
      });
      handleCancel();
      onCancel();
    } else {
      setErr("標題跟連結不得為空");
    }
  };

  const handleCancel = () => {
    setEachEntry({
      ...init,
    });
    setErr("");
    onCancel();
  };

  const handleInputChange = (evt) => {
    setEachEntry({
      ...eachEntry,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <Modal
      title="分享筆記"
      okText="送出"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>筆記標題</label>
        <Input onChange={handleInputChange} name="title" value={title} />
        <div className="red">{errMsg}</div>
      </div>
      <div className="mb2">
        <label>筆記連結</label>
        <Input onChange={handleInputChange} name="link" value={link} />
        <div className="red">{errMsg}</div>
      </div>
    </Modal>
  );
};

export default NoteModal;
