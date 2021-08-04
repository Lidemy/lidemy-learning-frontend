import React, { useEffect, useState, useCallback, memo } from "react";
import { List, Avatar, Row, Col, Card, message } from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";

import Markdown from "../common/markdown";
import { getArticle, createComment } from "../../api";
import Loading from "../loading";
import Editor from "../editor";

function ArticleHeader({ item }) {
  const defaultImage = "https://avatars.githubusercontent.com/Lidemy";
  const isMigrated = !!item.nickname;
  return (
    <div style={{ width: "100%" }}>
      <div className="b">
        <span style={{ fontSize: "20px" }}>{item.title}</span>
      </div>
      <div style={{ fontSize: "14px", marginTop: "4px" }}>
        <a
          style={
            isMigrated && {
              pointerEvents: "none",
              color: "black"
            }
          }
          href={`/users/${item.User.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            size="small"
            src={isMigrated ? defaultImage : item.User.picture}
          />
          <span className="ml2">{item.nickname || item.User.nickname}</span>
        </a>
        <span className="ml2" style={{ color: "black" }}>
          發佈於
        </span>
        &nbsp;
        <span style={{ color: "black" }}>
          {moment(item.createdAt).format("llll")}
        </span>
      </div>
    </div>
  );
}

const CommentList = ({ comments }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={item => (
        <List.Item actions={[<a>編輯</a>, <a>刪除</a>]}>
          <List.Item.Meta
            avatar={<Avatar src={item.User.picture} />}
            title={
              item.User.nickname +
              " 留言於 " +
              moment(item.createdAt).format("llll")
            }
            description={<Markdown source={item.content} />}
          />
        </List.Item>
      )}
    />
  );
};

const MemoCommentList = memo(CommentList);

function InterviewPost({ match }) {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  const postId = match.params.id;

  const getArticleContent = useCallback(
    () => {
      setIsLoading(true);
      getArticle(postId)
        .then(res => {
          setArticle(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    },
    [postId]
  );

  useEffect(
    () => {
      getArticleContent();
    },
    [getArticleContent]
  );

  const handleCommentChange = e => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = () => {
    console.log("here");
    if (!commentContent) return;
    setIsLoading(true);
    createComment({
      ArticleId: postId,
      content: commentContent
    })
      .then(res => {
        getArticleContent();
        message.success("新增成功！");
        setCommentContent("");
      })
      .catch(err => {
        setIsLoading(false);
        message.error("新增失敗！");
      });
  };

  if (!article) return <Loading />;
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
          <Card title={<ArticleHeader item={article} />} bordered={false}>
            <Markdown source={article.content} />
            <hr />
            <MemoCommentList comments={article.Comments} />
            <Editor
              rows={5}
              showButton
              onChange={handleCommentChange}
              onSubmit={handleSubmit}
              value={commentContent}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(InterviewPost);
