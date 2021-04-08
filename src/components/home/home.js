import React, { Component } from "react";
import moment from "moment";
import Markdown from "../common/markdown";
import { Comment, Tooltip, Row, Col, Card, message, Collapse } from "antd";
import Loading from "../loading";

const Panel = Collapse.Panel;

class News extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <Comment
        author={item.User.nickname}
        avatar={item.User.picture}
        content={
          <div>
            <h2>{item.title}</h2>
            <div style={{ whiteSpace: "pre-wrap" }}>
              <Markdown source={item.content} />
            </div>
          </div>
        }
        datetime={
          <Tooltip title={moment(item.createdAt).format("LLLL")}>
            <span>{moment(item.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}

class Home extends Component {
  componentDidMount() {
    this.props.getNewsList();
    this.props.getCurrentUser();
  }

  componentDidUpdate(prevProps) {
    const { isLoadingUpdateProgress, updateProgressError } = this.props;
    if (
      prevProps.isLoadingUpdateProgress !== isLoadingUpdateProgress &&
      !isLoadingUpdateProgress
    ) {
      if (updateProgressError) {
        message.error("更新失敗");
      } else {
        message.success("更新成功");
        this.props.getCurrentUser();
      }
    }
  }

  onNext = () => {
    this.props.progressUp();
  };

  onBack = () => {
    this.props.progressDown();
  };

  render() {
    const { newsList, user, isLoadingUpdateProgress } = this.props;
    const current = user.progress - 1;
    return (
      <section>
        {isLoadingUpdateProgress && <Loading />}
        <Row>
          <Col span={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="系統介紹" key="1">
                <Markdown
                  source={`
Hello，歡迎來到 Lidemy 簡易學習系統 🎉

你可以在這個系統繳交每日進度報告以及回報課程進度，在進度報告頁面能夠看到與你進度相似的同學  
若是你剛好發現他卡關的地方你之前也卡過，不妨主動找他聊聊 😊

Happy Learing, Happy Coding!

## 資源整理

1. [第四期課程大綱](https://github.com/Lidemy/mentor-program-4th)
2. [第四期筆記專區](https://hackmd.io/@huli/r1PtmBep8)
3. [Lidemy 線上課程網站](https://lidemy.com)
4. [LIOJ](https://oj.lidemy.com/)
5. [第四期匿名提問箱](https://forms.gle/2RHmLmJGvNpG22Pu8)
6. [第四期繳款表單（每月 12 號以前繳款，12500 元）](https://forms.gle/rS1b9BNcimnadL7x7)`}
                />
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col md={14}>
            <Card title="最新消息" bordered={false}>
              <Collapse bordered={false} defaultActiveKey={[0]}>
                {newsList.map((item, idx) => (
                  <Panel header={item.title} key={idx}>
                    <News item={item} />
                  </Panel>
                ))}
              </Collapse>
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Home;
