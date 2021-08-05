import React, { useState, useEffect } from "react";
import { Input, Tabs, Button, Select, Modal, message } from "antd";
import Markdown from "../common/markdown";
import TemplateModal from "./templateModal";
import storage from "../../utils/storage";

const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

const Editor = ({ rows, showButton, onChange, onAdd, value, onSubmit }) => {
  const [templates, setTemplates] = useState(storage.getTemplates());
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleChange = id => {
    onAdd(templates.find(item => item.id === Number(id)).content);
  };

  const deleteTemplate = (e, id) => {
    e.stopPropagation();
    confirm({
      title: "確定要刪除嗎？",
      onOk: () => {
        setTemplates(templates.filter(item => item.id !== id));
      }
    });
  };

  const handleAddTemplate = data => {
    if (!data.name || !data.content) return;
    if (templates.length >= 7) {
      return message.error(
        "已達模板數量上限，請加值以解鎖更多功能（開玩笑的）"
      );
    }
    const lastId =
      templates.length === 0 ? 0 : templates[templates.length - 1].id;
    setTemplates([
      ...templates,
      {
        ...data,
        id: lastId + 1
      }
    ]);
  };

  useEffect(
    () => {
      storage.setTemplates(templates);
    },
    [templates]
  );

  return (
    <div>
      <TemplateModal
        visible={showTemplateModal}
        onCancel={() => setShowTemplateModal(false)}
        onConfirm={handleAddTemplate}
      />
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab="Write" key="1">
          <div>
            <TextArea rows={rows || 15} onChange={onChange} value={value} />
            {showButton && (
              <div className="flex justify-between flex-wrap mt1">
                {onAdd && (
                  <div>
                    <Select
                      value={undefined}
                      placeholder="選擇模板"
                      style={{ width: 120, marginRight: "15px" }}
                      onChange={handleChange}
                    >
                      {templates &&
                        templates.map(item => (
                          <Option
                            className="ant-option"
                            key={item.id}
                            value={item.id}
                          >
                            <span>{item.name}</span>
                            <Button
                              type="link"
                              icon="delete"
                              size="small"
                              onClick={e => deleteTemplate(e, item.id)}
                            />
                          </Option>
                        ))}
                    </Select>
                    <Button
                      type="primary"
                      shape="circle"
                      icon="plus"
                      size="small"
                      onClick={() => setShowTemplateModal(true)}
                    />
                  </div>
                )}
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
};

export default Editor;
