import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Select, Input } from "antd";
import jwtDecode from "jwt-decode";

const { Option } = Select;

function isValidJWT(token) {
  try {
    jwtDecode(token);
    return true;
  } catch (err) {
    return false;
  }
}

const LinkModal = ({ visible, onCancel, onConfirm }) => {
  const init = {
    semester: 4,
    role: "student"
  };
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [eachEntry, setEachEntry] = useState(init);
  const { inviteResult } = useSelector(state => ({
    ...state.auth
  }));
  const { semester, role } = eachEntry;
  const selectRole = [
    {
      name: "學生",
      value: "student"
    },
    {
      name: "助教",
      value: "ta"
    }
  ];

  const handleConfirm = () => {
    onConfirm({
      ...eachEntry
    });
  };

  const handleCancel = () => {
    setEachEntry({
      ...init
    });
    onCancel();
  };

  const handleTextChange = evt => {
    const arr = evt.target.value.split("/");
    if (arr) {
      setText(arr[arr.length - 1]);
      setLink("");
    }
  };

  const onChange = evt => {
    setEachEntry({
      ...eachEntry,
      [evt.target.name]: evt.target.value
    });
  };

  useEffect(
    () => {
      setLink(inviteResult);
    },
    [inviteResult]
  );

  return (
    <Modal
      title="邀請連結"
      okText="產生連結"
      cancelText="取消"
      onOk={handleConfirm}
      onCancel={handleCancel}
      visible={visible}
    >
      <div className="mb2">
        <label>期數</label>
        <div>
          <Select value={semester} onChange={onChange}>
            {[...Array(4).keys()].map(item => (
              <Option key={item} value={item + 1}>
                {item + 1}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mb2">
        <label>身份</label>
        <div>
          <Select value={role} onChange={onChange}>
            {selectRole.map((item, idx) => (
              <Option key={idx} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mb2">
        <p>網址：</p>
        {link && (
          <p>
            {window.location.origin}/invite/{link}
          </p>
        )}
      </div>
      <div className="mb2">
        <p>連結狀態查詢：</p>
        <Input
          value={text}
          onChange={handleTextChange}
          placeholder="輸入邀請碼"
        />
      </div>
      <div className="mb2">
        {text && isValidJWT(text) && (
          <p>過期時間：{new Date(jwtDecode(text).exp * 1000).toString()}</p>
        )}
        {link && isValidJWT(link) && (
          <p>過期時間：{new Date(jwtDecode(link).exp * 1000).toString()}</p>
        )}
      </div>
    </Modal>
  );
};

export default LinkModal;
