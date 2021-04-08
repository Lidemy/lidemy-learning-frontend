import React, { useEffect, useState } from "react";
import { Typography, Button, Form, Input, Icon, Switch } from "antd";

import { getSyllabus, updateSyllabus, deleteSyllabus } from "../../api";

const { Title } = Typography;
const { TextArea } = Input;

const FormList = ({
  week,
  syllabus,
  handleList,
  form: { getFieldDecorator, validateFields },
}) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (values.category) {
          setLoading(true);
          updateSyllabus(
            { week, category: values.category },
            {
              content: values.content,
              title: values.title,
              visible: false,
            }
          ).then(() => {
            setLoading(false);
          });
        }
      }
    });
  };

  const handleDelete = (params, id) => {
    setLoading(true);
    deleteSyllabus(params).then(() => {
      setLoading(false);
      handleList(id);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <span>標題：</span>
      {getFieldDecorator(`title`, {
        initialValue: syllabus.title || "",
      })(<Input style={{ width: "20%" }} />)}
      <span className="ml3">Key：</span>
      {getFieldDecorator("category", {
        initialValue: syllabus.category || "",
      })(<Input style={{ width: "20%" }} />)}
      <span className="ml3">完成作業才可見：</span>
      {getFieldDecorator("visible", {
        valuePropName: "checked",
        initialValue: syllabus.visible,
      })(<Switch />)}
      <div className="mt2">內容：</div>
      {getFieldDecorator("content", {
        initialValue: syllabus.content || "",
      })(<TextArea autoSize={true} />)}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          更新
        </Button>
        <Button
          className="ml2"
          type="danger"
          loading={isLoading}
          onClick={() =>
            handleDelete(
              {
                week,
                category: syllabus.category,
              },
              syllabus.id
            )
          }
        >
          刪除
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedFormList = Form.create()(FormList);

const Syllabus = ({ match }) => {
  const [syllabusList, setSyllabusList] = useState([]);
  const week = match.params.week;

  const handleAdd = () => {
    setSyllabusList([
      ...syllabusList,
      {
        category: "",
        title: "",
        content: "",
        visible: false,
      },
    ]);
  };

  useEffect(() => {
    getSyllabus({ week }).then((res) => {
      setSyllabusList(res.data);
    });
  }, [week]);

  return (
    <>
      <Title>課綱編輯</Title>
      {syllabusList.map((syllabus) => (
        <div className="mt3">
          <WrappedFormList
            week={week}
            syllabus={syllabus}
            handleList={(id) => {
              setSyllabusList(
                syllabusList.filter((syllabus) => syllabus.id !== id)
              );
            }}
          />
        </div>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={handleAdd}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
    </>
  );
};

export default Syllabus;
