import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Tabs,
  DatePicker,
  InputNumber,
  Collapse,
  Row,
  Col,
  Button
} from "antd";
import Loading from "../loading";
import Markdown from "../common/markdown";
import { getDropUsers, getUserReports } from "../../api";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Report = ({ report }) => {
  return (
    <Card title={moment(report.createdAt).format("YYYY-MM-DD")}>
      <div
        style={{ height: "300px", overflow: "auto", whiteSpace: "pre-wrap" }}
      >
        <Markdown source={report.content} />
      </div>
    </Card>
  );
};

const UserPanel = ({ user, key }) => {
  console.log(user);
  return (
    <Collapse.Panel key={key} header={user.nickname}>
      <Row>
        <div>
          <Button type="link" target={`/users/${user.id}`}>
            個人檔案
          </Button>
          <span className="ml2 mr2">方案：{user.priceType}</span>
          <span className="mr2">作業數：{user.hw}</span>
          <span>心得數：{user.count}</span>
        </div>
      </Row>
      <Row gutter={5}>
        {user.reports &&
          user.reports.map(report => (
            <Col span={8} className="mb1">
              <Report report={report} />
            </Col>
          ))}
      </Row>
    </Collapse.Panel>
  );
};

const Dashboard = () => {
  const [rangeDate, setRangeDate] = useState([
    moment()
      .subtract(7, "days")
      .calendar(),
    moment().format("YYYY/MM/DD")
  ]);
  const [isLoading, setLoading] = useState(false);
  const [semester, setSemester] = useState(5);
  const [dropUsers, setDropUser] = useState([]);
  const [begin, end] = rangeDate;
  const dateFormat = "YYYY/MM/DD";

  const handleDate = (date, range) => {
    setRangeDate(range);
  };
  const handleSemester = val => {
    setSemester(val);
  };

  const handleCollpase = async idx => {
    if (idx) {
      const userId = dropUsers[idx].id;
      setLoading(true);
      try {
        const res = await getUserReports(userId, 1);
        setDropUser(
          dropUsers.map(user => ({
            ...user,
            ...(user.id === userId && { reports: res.data.reports })
          }))
        );
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  useEffect(
    () => {
      setLoading(true);
      getDropUsers({
        begin,
        end,
        semester: 5
      })
        .then(res => {
          setDropUser(res.data.filter(user => user.count <= 8));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    },
    [rangeDate, semester]
  );

  return (
    <div>
      <Title>學生狀態列表</Title>
      {!!dropUsers.length && <div>共 {dropUsers.length} 位不符合條件</div>}
      <div className="mt3 mb3">
        <label>時間：</label>
        <RangePicker
          defaultValue={[moment(begin, dateFormat), moment(end, dateFormat)]}
          onChange={handleDate}
        />
        <label className="ml3">學期：</label>
        <InputNumber onChange={handleSemester} defaultValue={semester} />
      </div>
      <div>
        {isLoading && <Loading />}
        {!dropUsers.length && "暫無不符合條件學生"}
        {!!dropUsers.length && (
          <Collapse accordion={true} onChange={handleCollpase}>
            {dropUsers.map((user, idx) =>
              UserPanel({
                user,
                key: idx
              })
            )}
          </Collapse>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
