import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

const TokenModal = ({ week, visible, onCancel, onConfirm }) => {
  const [token, setToken] = useState("");
  const [errMsg, setErr] = useState("");

  useEffect(() => {
    setToken("");
  }, [visible]);

  const handleConfirm = () => {
    if (token) {
      onConfirm({
        week,
        token,
      });
      handleCancel();
      onCancel();
    } else {
      setErr("token 不得為空");
    }
  };

  const handleCancel = () => {
    setToken("");
    setErr("");
    onCancel();
  };

  return (
    <Modal
      title="通關碼"
      okText="送出"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>如果需要請跟助教索取通關碼</label>
        <Input
          onChange={(evt) => setToken(evt.target.value)}
          name="token"
          value={token}
        />
        <div className="red">{errMsg}</div>
      </div>
    </Modal>
  );
};

export default TokenModal;
