/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState, useCallback, memo } from "react";
import {
  List,
  Avatar,
  Row,
  Col,
  Card,
  message,
  Popconfirm,
  Button
} from "antd";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Markdown from "../common/markdown";
import {
  getArticle,
  createComment,
  deleteComment,
  updateComment,
  deleteArticle,
  updateArticle
} from "../../api";
import Loading from "../loading";
import Editor from "../editor";
import UpdateCommentModal from "./updateCommentModal";
import UpdateArticleModal from "./updateArticleModal";

function ArticleHeader({ user, item, onUpdate, onDelete }) {
  const defaultImage = "https://avatars.githubusercontent.com/Lidemy";
  const isMigrated = !!item.nickname;
  const isAuthor = user && user.id === item.UserId;
  return (
    <div style={{ width: "100%" }}>
      <div className="b">
        <span style={{ fontSize: "20px" }}>{item.title}</span>
      </div>
      <div style={{ fontSize: "14px", marginTop: "4px" }}>
        <a
          style={
            isMigrated
              ? {
                  pointerEvents: "none",
                  color: "black"
                }
              : {}
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
      {isAuthor && (
        <div className="mt2">
          <Button
            type="primary"
            onClick={() => {
              onUpdate(item);
            }}
          >
            編輯
          </Button>
          <Popconfirm
            title="你確定要刪除嗎？"
            onConfirm={() => {
              onDelete(item);
            }}
          >
            <Button className="ml1" type="danger">
              刪除
            </Button>
          </Popconfirm>
        </div>
      )}
    </div>
  );
}

const CommentList = ({ comments, user, onUpdate, onDelete }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={comments}
      locale={{
        emptyText: "暫無留言"
      }}
      renderItem={item => {
        const isAuthor = user && user.id === item.User.id;
        return (
          <List.Item
            actions={
              isAuthor && [
                <a
                  onClick={() => {
                    onUpdate(item);
                  }}
                >
                  編輯
                </a>,
                <Popconfirm
                  title="你確定要刪除嗎？"
                  onConfirm={() => {
                    onDelete(item);
                  }}
                  okText="是"
                  cancelText="否"
                >
                  <a>刪除</a>
                </Popconfirm>
              ]
            }
          >
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
        );
      }}
    />
  );
};

const MemoCommentList = memo(CommentList);

function InterviewPost({ match, user, history }) {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [comment, setComment] = useState();

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

  const confirmUpdateComment = ({ id, content }) => {
    setIsLoading(true);
    updateComment(id, { content })
      .then(res => {
        setIsLoading(false);
        setShowModal(false);
        getArticleContent();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleCommentChange = e => {
    setCommentContent(e.target.value);
  };

  const handleUpdateComment = useCallback(item => {
    setShowModal(true);
    setComment(item);
  });

  const handleDeleteComment = useCallback(item => {
    setIsLoading(true);
    deleteComment(item.id)
      .then(() => {
        setIsLoading(false);
        message.success("刪除成功");
        getArticleContent();
      })
      .catch(() => {
        setIsLoading(false);
        message.error("刪除失敗");
      });
  });

  const handleUpdateArticle = useCallback(item => {
    setShowArticleModal(true);
  });

  const confirmUpdateArticle = useCallback(item => {
    setIsLoading(true);
    updateArticle(item.id, {
      content: item.content,
      title: item.title
    })
      .then(res => {
        setIsLoading(false);
        setShowArticleModal(false);
        getArticleContent();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  });

  const handleDeleteArticle = useCallback(item => {
    setIsLoading(true);
    deleteArticle(item.id)
      .then(() => {
        setIsLoading(false);
        message.success("刪除成功");
        history.push("/interviews");
      })
      .catch(() => {
        setIsLoading(false);
        message.error("刪除失敗");
      });
  });

  const handleSubmit = () => {
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
      <UpdateArticleModal
        visible={showArticleModal}
        instance={article}
        onCancel={() => {
          setShowArticleModal(false);
        }}
        onConfirm={confirmUpdateArticle}
      />
      <UpdateCommentModal
        visible={showModal}
        instance={comment}
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={confirmUpdateComment}
      />
      <Row gutter={16}>
        <Col md={32}>
          <Card
            title={
              <ArticleHeader
                user={user}
                item={article}
                onUpdate={handleUpdateArticle}
                onDelete={handleDeleteArticle}
              />
            }
            bordered={false}
          >
            <Markdown source={article.content} />
            <hr />
            <MemoCommentList
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
              user={user}
              comments={article.Comments}
            />
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

const mapStateToProps = store => ({
  user: store.auth.user
});

export default withRouter(connect(mapStateToProps)(InterviewPost));
