import React, { useState } from "react";
import { Modal, Input, Select } from "antd";

const { Option } = Select;

const HomeworkModal = ({ visible, onCancel, onConfirm }) => {
  const init = {
    week: 1,
    prUrl: ""
  };
  const [eachEntry, setEachEntry] = useState(init);
  const [errMsg, setErr] = useState("");
  const { week, prUrl } = eachEntry;

  const handleConfirm = () => {
    if (prUrl) {
      onConfirm({
        ...eachEntry
      });
      handleCancel();
      onCancel();
    } else {
      setErr("pr 連結不得為空");
    }
  };

  const handleCancel = () => {
    setEachEntry({
      ...init
    });
    setErr("");
    onCancel();
  };

  const handleInputChange = evt => {
    setEachEntry({
      ...eachEntry,
      [evt.target.name]: evt.target.value
    });
  };

  const onChange = value => {
    setEachEntry({
      ...eachEntry,
      week: value
    });
  };

  return (
    <Modal
      title="作業"
      okText="送出"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>第幾週</label>
        <div>
          <Select value={week} onChange={onChange}>
            {[...Array(24).keys()].map(item => (
              <Option key={item} value={item + 1}>
                week{item + 1}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mb2">
        <label>pr 連結</label>
        <Input onChange={handleInputChange} name="prUrl" value={prUrl} />
        <div className="red">{errMsg}</div>
      </div>
    </Modal>
  );
};

export default HomeworkModal;
