import React, { useState } from "react";
import { Modal, Input, Select, Checkbox } from "antd";

const { Option } = Select;

const HomeworkModal = ({ visible, onCancel, onConfirm }) => {
  const init = {
    week: 1,
    prUrl: "",
    isCheckHomework: false,
    isCheckReview: false
  };
  const [eachEntry, setEachEntry] = useState(init);
  const [errMsg, setErr] = useState("");
  const { week, prUrl, isCheckHomework, isCheckReview } = eachEntry;

  const handleConfirm = () => {
    if (prUrl && prUrl.match("github") && isCheckHomework && isCheckReview) {
      onConfirm({
        ...eachEntry
      });
      handleCancel();
      onCancel();
    } else {
      setErr("pr 連結不得為空或非 github pr 連結");
      if (!isCheckHomework || !isCheckReview) {
        setErr("請確認是否檢查過作業須知");
      }
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

  const handleInputCheck = evt => {
    setEachEntry({
      ...eachEntry,
      [evt.target.name]: evt.target.checked
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
      <div className="mb2">
        <Checkbox
          name="isCheckHomework"
          value={isCheckHomework}
          onChange={handleInputCheck}
        >
          確認已經檢查過作業
        </Checkbox>
        <Checkbox
          name="isCheckReview"
          value={isCheckReview}
          onChange={handleInputCheck}
        >
          確認已經看過作業提醒
        </Checkbox>
      </div>
    </Modal>
  );
};

export default HomeworkModal;
