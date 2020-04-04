import React, { Component } from "react";
import moment from "moment";
import Markdown from "../common/markdown";
import {
  Collapse,
  Comment,
  Tooltip,
  List,
  Row,
  Col,
  Steps,
  Button,
  Card,
  Popconfirm,
  message
} from "antd";
import Loading from "../loading";

const Step = Steps.Step;
const Panel = Collapse.Panel;

const schedules = [
  {
    title: "第一週（04/15 ~ 04/21）：暖身週",
    description: "掌握 Git 與 Command line 操作"
  },
  {
    title: "第二週（04/22 ~ 04/28）：程式基礎（上）",
    description: "掌握 JavaScript 基礎"
  },
  {
    title: "第三週（04/29 ~ 05/05）：程式基礎（下）",
    description: "熟悉 JavaScript 程式基礎"
  },
  {
    title: "第四週（05/06 ~ 05/12）：網路基礎",
    description: "熟悉網路概念與 API"
  },
  {
    title: "第五週（05/13 ~ 05/19）：複習週",
    description: "複習前幾週所學"
  },
  {
    title: "第六週（05/20 ~ 05/26）：前端基礎（一）",
    description: "掌握基本 HTML 與 CSS"
  },
  {
    title: "第七週（05/27 ~ 06/02）：前端基礎（二）",
    description: "在網頁上使用 JavaScript 與事件處理"
  },
  {
    title: "第八週（06/03 ~ 06/09）：前端基礎（三）",
    description: "用 JavaScript 與後端溝通"
  },
  {
    title: "第九週（06/10 ~ 06/16）：後端基礎（一）",
    description: "掌握 PHP 與 SQL 基礎用法"
  },
  {
    title: "第十週（06/17 ~ 06/23）：複習週",
    description: "複習前幾週所學"
  },
  {
    title: "第十一週（06/24 ~ 06/30）：後端基礎（二）",
    description: "知道 Session 與 Cookie 的差異"
  },
  {
    title: "第十二週（07/01 ~ 07/07）：後端基礎（三）",
    description: "認識資訊安全以及防範方法"
  },
  {
    title: "第十三週（07/08 ~ 07/14）：前端基礎（四）",
    description: "熟悉 jQuery, Bootstrap 與 Promise"
  },
  {
    title: "第十四週（07/15 ~ 07/21）：後端基礎（四）",
    description: "知道如何部署自己的程式"
  },
  {
    title: "第十五週（07/22 ~ 07/28）：複習週",
    description: "複習前幾週所學"
  },
  {
    title: "第十六週（07/29 ~ 08/04）：前端中階（上）",
    description: "學習 CSS 預處理器與 Cache 基本概念"
  },
  {
    title: "第十七週（08/05 ~ 08/11）：前端中階（中）",
    description: "理解 Event Loop 與 JS 觀念"
  },
  {
    title: "第十八週（08/12 ~ 08/18）：前端中階（下）",
    description: "學習 Gulp 與 Webpack"
  },
  {
    title: "第十九週（08/19 ~ 08/25）：網路基礎複習",
    description: "複習網路概念"
  },
  {
    title: "第二十週（08/26 ~ 09/01）：複習週",
    description: "複習前幾週所學"
  },
  {
    title: "第二十一週（09/02 ~ 09/08）：前後端框架（一）",
    description: "前後端框架"
  },
  {
    title: "第二十二週（09/09 ~ 09/15）：前後端框架（二）",
    description: "前後端框架"
  },
  {
    title: "第二十三週（09/16 ~ 09/22）：前後端框架（三）",
    description: "前後端框架"
  },
  {
    title: "第二十四週（09/23 ~ 09/29）：前後端框架（四）",
    description: "前後端框架"
  },
  {
    title: "第二十五週（09/30 ~ 10/06）：Final Project",
    description: "Final Project"
  },
  {
    title: "第二十六週（10/07 ~ 10/13）：Final Project",
    description: "Final Project"
  }
];

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
            <Collapse>
              <Panel header="學習系統簡介" key="1">
                <p className="f5">
                  Hello，歡迎來到 Lidemy 簡易學習系統{" "}
                  <span role="img" aria-label="tada">
                    🎉
                  </span>{" "}
                  <br />
                  <br />
                  你可以在這個系統繳交每日進度報告以及回報課程進度，在進度報告頁面能夠看到與你進度相似的同學
                  <br />
                  若是你剛好發現他卡關的地方你之前也卡過，不妨主動找他聊聊{" "}
                  <span role="img" aria-label="smile">
                    😊
                  </span>
                  <br /> <br />
                  而課程的主要溝通管道還是
                  Slack，有任何近況都會先在那邊報告，這邊的最新消息則會在一陣子之後才更新
                  <br />
                  要問問題的話請到 Spectrum，那邊的訊息記錄會永久保存著
                  <br /> <br />
                  Happy Learing, Happy Coding!
                </p>
              </Panel>
            </Collapse>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col md={10}>
            <Card title="課程時程" bordered={false}>
              <p>此課程為建議時程，可根據個人進度自由調整</p>
              <Steps direction="vertical" current={current}>
                {schedules.map((item, idx) => (
                  <Step
                    key={item.title}
                    title={item.title}
                    description={
                      <div>
                        {item.description}
                        {idx === current && (
                          <div className="mt2">
                            <Popconfirm
                              title="你確定完成這一週的進度了嗎？"
                              okText="是"
                              cancelText="否"
                              onConfirm={this.onNext}
                            >
                              <Button type="primary">完成</Button>
                            </Popconfirm>
                            {current !== 0 && (
                              <Button className="ml1" onClick={this.onBack}>
                                回上一週
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    }
                  />
                ))}
              </Steps>
            </Card>
          </Col>
          <Col md={14}>
            <Card title="最新消息" bordered={false}>
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={newsList}
                renderItem={item => <News item={item} />}
              />
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Home;
