import React, { useState, useEffect } from "react";
import { Modal, Input, message } from "antd";
import storage from "../../utils/storage";

const PayModal = ({ visible, onCancel, onConfirm }) => {
  const [bankCode, setBankCode] = useState(storage.getBankCode() || "");
  const [payDate, setPayDate] = useState("");

  const handleConfirm = () => {
    if (!bankCode || !payDate) {
      return message.error("資料皆為必填");
    }
    onConfirm({
      bankCode,
      payDate
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(
    () => {
      if (!visible) {
        setBankCode("");
        setPayDate("");
      } else {
        setBankCode(storage.getBankCode());
      }
    },
    [visible]
  );

  return (
    <Modal
      title="新增付款資訊"
      okText="確定"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>帳號後五碼：</label>
        <Input
          onChange={e => setBankCode(e.target.value)}
          name="bankCode"
          value={bankCode}
        />
      </div>
      <div className="mb2">
        <label>付款日期</label>
        <Input
          type="date"
          onChange={e => setPayDate(e.target.value)}
          name="payDate"
          value={payDate}
        />
      </div>
    </Modal>
  );
};

export default PayModal;
