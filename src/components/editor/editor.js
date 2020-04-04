import React, { Component } from "react";
import { Input, Tabs, Button } from "antd";
import Markdown from "../common/markdown";

const { TextArea } = Input;
const TabPane = Tabs.TabPane;

class Editor extends Component {
  render() {
    const { rows, showButton, onChange, value, onSubmit } = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab="Write" key="1">
            <div>
              <TextArea rows={rows || 15} onChange={onChange} value={value} />
              {showButton && (
                <div style={{ textAlign: "right", marginTop: "5px" }}>
                  <Button
                    type="primary"
                    onClick={onSubmit}
                    style={{ width: "200px" }}
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
}

export default Editor;
