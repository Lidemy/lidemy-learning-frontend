import React, { useState } from "react";
import { Modal, Input, message } from "antd";

const CreateTransactionModel = ({ visible, onCancel, onConfirm }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [userId, setUserId] = useState("");

  const handleConfirm = () => {
    if (!name || !amount || !expireTime || !userId) {
      return message.error("資料皆為必填");
    }
    onConfirm({
      name,
      amount,
      expireTime,
      UserId: userId
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title="新增款項"
      okText="確定"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>使用者 ID</label>
        <Input
          onChange={e => setUserId(e.target.value)}
          name="userId"
          value={userId}
        />
      </div>
      <div className="mb2">
        <label>款項名稱</label>
        <Input
          onChange={e => setName(e.target.value)}
          name="name"
          value={name}
        />
      </div>
      <div className="mb2">
        <label>金額</label>
        <Input
          type="number"
          onChange={e => setAmount(e.target.value)}
          name="amount"
          value={amount}
        />
      </div>
      <div className="mb2">
        <label>截止日期</label>
        <Input
          type="date"
          onChange={e => setExpireTime(e.target.value)}
          name="expireTime"
          value={expireTime}
        />
      </div>
    </Modal>
  );
};

export default CreateTransactionModel;
