import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col, Card } from "antd";
import moment from "moment";

import { getArticles } from "../../api";
import Loading from "../loading";

function ListItem({ item }) {
  const defaultImage = "https://avatars.githubusercontent.com/Lidemy";
  const isMigrated = !!item.nickname;
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
      </div>
      <div>
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

  const handlePaginationChange = page => {
    setCurrentPage(page);
  };

  useEffect(
    () => {
      setIsLoading(true);
      getArticles({
        page: currentPage
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
    [currentPage]
  );

  return (
    <div>
      {isLoading && <Loading />}
      <Row gutter={16}>
        <Col md={32}>
          <Card title="面試心得" bordered={false}>
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
