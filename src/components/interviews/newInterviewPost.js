import React, { useEffect, useState } from "react";
import { Input, Row, Col, Card, message } from "antd";
import { withRouter } from "react-router-dom";

import { createArticle } from "../../api";
import Loading from "../loading";
import Editor from "../editor";
import storage from "../../utils/storage";

function NewInterviewPost({ user, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(() => {
    return storage.getInterviewTitle() || "";
  });
  const [content, setContent] = useState(() => {
    return storage.getInterviewContent() || "";
  });

  useEffect(
    () => {
      storage.setInterviewTitle(title);
    },
    [title]
  );

  useEffect(
    () => {
      storage.setInterviewContent(content);
    },
    [content]
  );

  const handleSubmit = () => {
    if (!title || !content) {
      return message.error("標題或內容不得為空");
    }
    setIsLoading(true);
    createArticle({
      title,
      content
    })
      .then(res => {
        setIsLoading(false);
        message.success("新增成功！");
        storage.setInterviewTitle("");
        storage.setInterviewContent("");
        history.push("/interviews/" + res.data.id);
      })
      .catch(err => {
        setIsLoading(false);
        message.error("新增失敗！");
      });
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto"
      }}
    >
      {isLoading && <Loading />}
      <Row gutter={16}>
        <Col md={32}>
          <Card title="新增面試心得" bordered={false}>
            標題：
            <Input value={title} onChange={e => setTitle(e.target.value)} />
            <Editor
              arows={5}
              showButton
              onChange={e => setContent(e.target.value)}
              onSubmit={handleSubmit}
              value={content}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(NewInterviewPost);
