import React, { useState, useEffect } from "react";
import { Input, Tabs, Button, Select } from "antd";
import Markdown from "../common/markdown";
import BadgeModal from "./badgeModal";

const { Option } = Select;

const { TextArea } = Input;
const TabPane = Tabs.TabPane;

const Editor = ({ rows, showButton, onChange, onAdd, value, onSubmit }) => {   
  const [badgeList, setBadgeList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [select, setSelect] = useState("加入標籤");

  const getBadge = () => JSON.parse(localStorage.getItem('badge'));

  const openModal = () => {
    setVisible(true);
  }

  const handleChange = (badge) => {
    onAdd(badge);
  }

  const closeModal = () => {
    setVisible(false);
  };

  const deleteBadge = (evt) => {
    evt.stopPropagation();
    const deleteList = badgeList.filter(item => item.name !== evt.target.value);
    localStorage.removeItem('badge');
    localStorage.setItem('badge', JSON.stringify(deleteList));
    setBadgeList(deleteList);
    setSelect("加入標籤");
  }

  const handleSetBadge = data => {
    const newList = badgeList ? [...badgeList, data] : [data];
    localStorage.setItem('badge', JSON.stringify(newList));
    setBadgeList(newList);
  };

  useEffect(
    () => {
      const badges = getBadge();
      setBadgeList(badges);
    },
    [rows]
  );

  return (
    <div>
      {<BadgeModal 
        visible={visible}
        onCancel={closeModal}
        onConfirm={handleSetBadge} 
      />}
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="Write" key="1">
          <div>
            <TextArea rows={rows || 15} onChange={onChange} value={value} />
            {showButton && (
              <div className="flex justify-between flex-wrap mt1">
                <div>
                  <Select value={select} style={{ width: 120, marginRight: '15px' }} onChange={handleChange}>
                    { badgeList && badgeList.map((item, idx) => 
                      <Option key={idx} value={item.link}>
                        <Button 
                          className="mr1"
                          type="danger" 
                          shape="circle" 
                          icon="minus"
                          size="small" 
                          value={item.name}
                          onClick={deleteBadge} 
                        />
                        {item.name} 
                      </Option>
                    )}
                  </Select>
                  <Button 
                    type="primary" 
                    shape="circle" 
                    icon="plus"
                    size="small" 
                    onClick={openModal} 
                  />
                </div>
                <Button
                  type="primary"
                  onClick={onSubmit}
                  style={{ width: "30%" }}
                >
                  送出
                </Button>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab="Preview" key="2">
          <Markdown source={value} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Editor;
