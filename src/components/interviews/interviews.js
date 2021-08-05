import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col, Card, Tag, Button, Input } from "antd";
import moment from "moment";
import { getArticles } from "../../api";
import Loading from "../loading";

const { Search } = Input;

function ListItem({ item }) {
  const defaultImage = "https://avatars.githubusercontent.com/Lidemy";
  const isMigrated = !!item.nickname;
  const commentLength = item.Comments && item.Comments.length;
  return (
    <div style={{ width: "100%" }} className="interviews">
      <div className="b">
        <span>
          <a
            href={`/interviews/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        </span>
        {commentLength > 0 && (
          <span className="ml2">
            <Tag color="orange">{commentLength} 則留言</Tag>
          </span>
        )}
      </div>
      <div>
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
          {moment(item.createdAt).format("YYYY-MM-DD")}
        </span>
      </div>
    </div>
  );
}

function Interviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");

  const handlePaginationChange = page => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = value => {
    setKeyword(value);
  };

  useEffect(
    () => {
      setIsLoading(true);
      getArticles({
        page: currentPage,
        keyword
      })
        .then(res => {
          setArticles(res.data.rows);
          setTotal(res.data.count);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    },
    [currentPage, keyword]
  );

  return (
    <div>
      {isLoading && <Loading />}
      <Row gutter={16}>
        <Col md={32}>
          <Card title="面試心得" bordered={false}>
            <Button className="mb2 mr2" type="primary" href="/interviews/new">
              新增面試心得
            </Button>
            <span>
              <Search
                style={{ maxWidth: 300 }}
                placeholder="搜尋文章標題及內容"
                onSearch={handleSearch}
                enterButton
              />
            </span>
            <List
              size="large"
              bordered
              dataSource={articles}
              pagination={{
                onChange: handlePaginationChange,
                current: currentPage,
                total: total
              }}
              renderItem={item => (
                <List.Item>
                  <ListItem item={item} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Interviews;
