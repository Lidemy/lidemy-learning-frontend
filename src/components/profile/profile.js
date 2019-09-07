import React, { Component } from "react";
import {
  Button,
  Card,
  List,
  Comment,
  Row,
  Col,
  Calendar,
  Statistic,
  Icon,
  Timeline,
  Pagination,
  Popconfirm,
  message
} from "antd";
import { withRouter } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import Loading from "../loading";
import ReportModal from "./reportModal";

const START_DATE = "2019-04-15";
const pageSize = 10;

class MarkdownView extends React.PureComponent {
  render() {
    const { value } = this.props;
    return <ReactMarkdown source={value} linkTarget="_blank" />;
  }
}

class ReportItem extends React.PureComponent {
  handleUpdate = () => {
    const { item, onUpdate } = this.props;
    onUpdate(item);
  };

  handleDelete = () => {
    const { item, onDelete } = this.props;
    onDelete(item);
  };

  render() {
    const { item, isMyProfile } = this.props;
    return (
      <Comment
        actions={
          isMyProfile && [
            <div>
              <Button type="primary" onClick={this.handleUpdate}>
                編輯
              </Button>
              <Popconfirm
                title="你確定要刪除嗎？"
                onConfirm={this.handleDelete}
              >
                <Button className="ml1" type="danger">
                  刪除
                </Button>
              </Popconfirm>
            </div>
          ]
        }
        author={item.User.nickname}
        avatar={item.User.picture}
        content={<MarkdownView value={item.content} />}
        datetime={moment(item.createdAt).format("LLLL")}
      />
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    const { match, user } = props;
    this.state = {
      page: 1,
      showModal: false,
      instance: null,
      userId: match.params.id || user.id,
      isMyProfile: !match.params.id
    };
  }

  componentDidMount() {
    const { getUserProfile } = this.props;
    getUserProfile(this.state.userId);
    this.getUserReports();
  }

  componentDidUpdate(prevProps) {
    const { isLoadingDeleteReport, isLoadingUpdateReport } = this.props;
    if (
      prevProps.isLoadingDeleteReport !== isLoadingDeleteReport &&
      !isLoadingDeleteReport
    ) {
      message.success("刪除成功");
      this.getUserReports();
    }

    if (
      prevProps.isLoadingUpdateReport !== isLoadingUpdateReport &&
      !isLoadingUpdateReport
    ) {
      message.success("更新成功");
      this.getUserReports();
    }
  }

  getUserReports = () => {
    const { page } = this.state;
    const { match, user } = this.props;
    const userId = match.params.id || user.id;
    this.props.getUserReports(userId, page);
  };

  onPageChange = page => {
    this.setState(
      {
        page
      },
      this.getUserReports
    );

    try {
      document.querySelector(".report-list").scrollIntoView();
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = item => {
    this.props.deleteReport(item.id);
  };

  handleUpdate = item => {
    this.setState({
      showModal: true,
      instance: item
    });
  };

  updateReport = data => {
    this.props.updateReport(data.id, data);
    this.setState({
      showModal: false,
      instance: null
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  renderItem = item => {
    const { isMyProfile } = this.state;
    return (
      <ReportItem
        item={item}
        isMyProfile={isMyProfile}
        onDelete={this.handleDelete}
        onUpdate={this.handleUpdate}
      />
    );
  };

  dateFullCellRender = value => {
    const { userProfile } = this.props;
    const dates = (userProfile && userProfile.dates) || [];
    return (
      <div className="ant-fullcalendar-date">
        <div
          className="ant-fullcalendar-value"
          style={
            dates.indexOf(value.format("YYYY-MM-DD")) >= 0
              ? {
                  background: "rgb(125, 204, 38)"
                }
              : {}
          }
        >
          {value.format("DD")}
        </div>
      </div>
    );
  };

  render() {
    const { page, instance, showModal, isMyProfile } = this.state;
    const {
      userProfile,
      reportCount,
      userReports,
      isLoadingGetUserReports,
      isLoadingDeleteReport,
      isLoadingUpdateReport
    } = this.props;

    const wordCount = (userProfile && userProfile.wordCount) || "";
    const total = (userProfile && userProfile.length) || "";
    const diff = moment().diff(moment(START_DATE));
    const days = Math.ceil(diff / (3600 * 24 * 1000));

    let timelines = [];
    if (userProfile && userProfile.progressions) {
      timelines = [...userProfile.progressions].reverse();
    }
    if (timelines.length <= 5) {
      timelines = [`${START_DATE} 計畫開始！`, ...timelines];
    }

    const isLoading =
      isLoadingDeleteReport || isLoadingUpdateReport || isLoadingGetUserReports;

    return (
      <div className="profile-page">
        {isLoading && <Loading />}
        <ReportModal
          visible={showModal}
          instance={instance}
          onCancel={this.closeModal}
          onConfirm={this.updateReport}
        />
        <Row gutter={16}>
          <Col md={12}>
            <Card title="學習日曆" bordered={false}>
              <p>綠色代表有進度報告</p>
              <Calendar
                dateFullCellRender={this.dateFullCellRender}
                fullscreen={false}
              />
            </Card>
          </Col>
          <Col md={12}>
            <Card title="學習數據" bordered={false}>
              <Row>
                <Col>
                  <div className="flex">
                    <Statistic
                      title={isMyProfile ? "你已經堅持了" : "已經堅持了"}
                      value={` ${days} 天`}
                      prefix={<Icon type="calendar" />}
                    />
                    <div className="ml4">
                      <Statistic
                        title="並且交了進度報告"
                        value={` ${total || 0} 篇`}
                        prefix={<Icon type="snippets" />}
                      />
                    </div>
                    <div className="ml4">
                      <Statistic
                        title="總共寫了"
                        value={` ${wordCount || 0} 字`}
                        prefix={<Icon type="edit" />}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt4">
                <Col>
                  <h3 className="mb3">最新動態</h3>
                  <Timeline>
                    {timelines.map(item => (
                      <Timeline.Item color="green" key={item}>
                        {item}
                      </Timeline.Item>
                    ))}
                    <Timeline.Item>持續往下一關邁進！</Timeline.Item>
                  </Timeline>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="report-list" title="進度報告" bordered={false}>
              <List
                header={`一共有 ${reportCount} 則報告`}
                itemLayout="horizontal"
                dataSource={userReports}
                renderItem={this.renderItem}
              />
              <Pagination
                current={page}
                total={reportCount}
                pageSize={pageSize}
                onChange={this.onPageChange}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Profile);
