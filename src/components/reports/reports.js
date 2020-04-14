import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Markdown from "../common/markdown";
import {
  Row,
  Col,
  Avatar,
  Card,
  Divider,
  Checkbox,
  message,
  Button,
  Tooltip,
  Tag
} from "antd";
import moment from "moment";
import debounce from "lodash/debounce";

import storage from "../../utils/storage";
import Editor from "../editor";
import Loading from "../loading";

class Title extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { isRead, item } = this.props;
    return (
      <div>
        <div
          className="absolute"
          style={{
            top: "0",
            left: "0",
            padding: "0px 0px 0px 2px",
            fontSize: "12px"
          }}
        >
          #{item.id}
        </div>
        <div
          className="absolute"
          style={{
            marginTop: "-18px",
            right: "-3px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "red",
            visibility: isRead ? "hidden" : "visible"
          }}
        />
        <div
          className="flex items-center justify-between relative"
          style={{
            top: "6px"
          }}
        >
          <a
            className="flex items-center"
            href={`/users/${item.User.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar size="large" src={item.User.picture} />
            <div style={{
              marginLeft: "15px"
            }}>
              <span 
                className="ml2"
                style={{
                  margin: "0"
                }}
              >
                {item.User.nickname}
                {item.User.slackId && `(${item.User.slackId})`}
              </span>
              <div className="flex items-center flex-start relative">
                {item.User.isTA && <Tag color="green">助教</Tag>}
                {item.User.isAdmin && <Tag color="red">管理員</Tag>}
                {item.User.isStudent && (
                  <Tag color="blue">第 {item.User.role} 期學生</Tag>
                )}
              </div>
            </div>
          </a>
          <Tooltip title={moment(item.createdAt).format("llll")}>
            <div>{moment(item.createdAt).format("YYYY-MM-DD")}</div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

class Report extends React.PureComponent {
  render() {
    const { item, height, isRead } = this.props;
    return (
      <Card title={<Title item={item} isRead={isRead} />}>
        <div style={{ height, overflow: "auto", whiteSpace: "pre-wrap" }}>
          <Markdown source={item.content} />
        </div>
      </Card>
    );
  }
}

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: storage.getTempReport() || "",
      showAllReport: storage.getShowAllReport() || false,
      showOneColumn: storage.getShowOneColumn() || false,
      page: 1,
      lastReadId: storage.getLastReadId()
    };

    this.setTempReport = debounce(this.setTempReport, 1000);
  }

  componentDidMount() {
    this.getReportList();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isLoadingCreateReport,
      createReportError,
      isLoadingGetReportList,
      reportList
    } = this.props;
    const { showAllReport, showOneColumn, text, page } = this.state;
    if (
      isLoadingCreateReport !== prevProps.isLoadingCreateReport &&
      !isLoadingCreateReport
    ) {
      if (createReportError) {
        message.error("新增失敗");
      } else {
        message.success("新增成功");
        storage.setTempReport("");
        this.getReportList();
        this.setState({
          text: ""
        });
      }
    }

    // set last read id after fetch data
    if (
      isLoadingGetReportList !== prevProps.isLoadingGetReportList &&
      !isLoadingGetReportList
    ) {
      if (reportList && reportList.length) {
        storage.setLastReadId(reportList[0].id);
      }
    }

    if (page !== prevState.page) {
      this.getReportList();
    }

    if (showAllReport !== prevState.showAllReport) {
      storage.setShowAllReport(showAllReport);
      this.getReportList();
    }

    if (showOneColumn !== prevState.showOneColumn) {
      storage.setShowOneColumn(showOneColumn);
    }

    if (text !== prevState.text) {
      this.setTempReport();
    }
  }

  componentWillUnmount() {
    const { clearReports } = this.props;
    clearReports();
  }

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    });
  };

  setTempReport = () => {
    const { text } = this.state;
    storage.setTempReport(text);
  };

  getReportList = () => {
    const { showAllReport, page } = this.state;
    const { getReportList } = this.props;
    const params = {
      page
    };
    if (showAllReport) {
      params.all = true;
    }
    getReportList(params);
  };

  onTextChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  onSubmit = () => {
    const { createReport } = this.props;
    const { text } = this.state;
    createReport({
      content: text
    });
  };

  onCheckboxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  render() {
    const { text, showAllReport, showOneColumn, lastReadId } = this.state;
    const {
      isLoadingCreateReport,
      isLoadingGetReportList,
      reportList
    } = this.props;
    const isLoading = isLoadingGetReportList || isLoadingCreateReport;
    return (
      <div>
        {isLoading && <Loading />}
        <Row gutter={16}>
          <Col md={12}>
            <Card title="每日進度報告（支援 Markdown 格式）" bordered={false}>
              <Editor
                showButton
                onChange={this.onTextChange}
                value={text}
                onSubmit={this.onSubmit}
              />
            </Card>
          </Col>
          <Col md={12}>
            <Card bordered={false} title="進度報告說明">
              <p>
                最低要求：今天學了什麼？碰到什麼問題？
                <br />
                若是還有時間與精力，可以參考下面的模板寫下心得
              </p>
              <h2>Objective 客觀</h2>
              <p>關於今天的課程，你記得什麼？ 完成了什麼？</p>

              <h2>Reflective 感受</h2>
              <p>
                你要如何形容今天的情緒？ 今天的高峰是什麼? 今天的低點是什麼?
              </p>

              <h2>Interpretive 解釋反思</h2>
              <p>我們今天學到了什麼？ 今天一個重要的領悟是什麼？</p>

              <h2>Decisional 決定行動</h2>
              <p>
                我們會如何用一句話形容今天的工作？ 有哪些工作需要明天繼續努力?
              </p>
              <p>
                延伸閱讀：
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://blog.niclin.tw/2016/08/09/%E5%88%9D%E6%8E%A2-orid-%E7%84%A6%E9%BB%9E%E8%A8%8E%E8%AB%96%E6%B3%95/"
                >
                  初探 ORID 焦點討論法
                </a>
                、
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.jianshu.com/p/56e5bf8ae9ee"
                >
                  如何使用ORID总结学习，加快进步？
                </a>
              </p>
            </Card>
          </Col>
        </Row>
        <Divider />
        <div>
          <Checkbox
            name="showAllReport"
            checked={showAllReport}
            onChange={this.onCheckboxChange}
          >
            顯示所有進度報告（未勾選則只顯示與自己進度相近的同學）
          </Checkbox>
          <Checkbox
            name="showOneColumn"
            checked={showOneColumn}
            onChange={this.onCheckboxChange}
          >
            一欄式排版（未勾選則顯示三欄式排版）
          </Checkbox>
        </div>
        <Row gutter={16}>
          {reportList.map(item => (
            <Col
              md={showOneColumn ? 24 : 8}
              key={item.id}
              style={{ marginTop: "10px" }}
            >
              <Report
                item={item}
                height={showOneColumn ? "auto" : "300px"}
                isRead={lastReadId >= item.id}
              />
            </Col>
          ))}
        </Row>
        <div className="mt2">
          <Button onClick={this.handleLoadMore} type="primary" block>
            載入更多
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Reports);
