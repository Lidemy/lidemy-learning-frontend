import React, { useEffect, useState } from "react";
import Markdown from "../common/markdown";
import { Tooltip, Row, Col, Button, Card, Checkbox, Collapse } from "antd";
import HomeworkModal from "./homeworkModal";
import NoteModal from "./noteModal";
import TokenModal from "./tokenModal";

import Timeline from "./timeline";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions";
import { courses, schedules } from "./data";

const SyllabusPanel = ({ syllabus, isNotFinish, idx }) => (
  <Collapse.Panel
    header={
      isNotFinish ? (
        <Tooltip title="尚未繳交作業">
          <div>{syllabus.title}</div>
        </Tooltip>
      ) : (
        <div>{syllabus.title}</div>
      )
    }
    disabled={isNotFinish}
    key={idx}
  >
    {<Markdown source={syllabus.text} />}
  </Collapse.Panel>
);

const NotePanel = ({ userId, notes, handleCreate, handleDelete }) => (
  <Collapse.Panel header="筆記">
    <ul>
      {!!!notes.length && <span>快來新增筆記吧!</span>}
      {!!notes.length &&
        notes.map((note, idx) => (
          <li key={idx}>
            <a href={note.link} className="mr2">
              {note.title}
            </a>
            {note.UserId === userId && (
              <Button
                shape="circle"
                icon="delete"
                size="small"
                onClick={() => handleDelete(note.id)}
              />
            )}
          </li>
        ))}
    </ul>
    <br />
    <div className="mt3">
      <Button
        type="primary"
        style={{ marginRight: "5px" }}
        onClick={handleCreate}
      >
        分享筆記
      </Button>
    </div>
  </Collapse.Panel>
);

const Course = () => {
  const section = new Date() - new Date("2021-04-12");
  const weekUnit = 7 * 24 * 60 * 60 * 1000;
  const current = Math.ceil((section < 0 ? 1 : section) / weekUnit);

  const [syllabusWeek, setSyllabusWeek] = useState(current);
  const [isCollapseAll, setIsCollapseAll] = useState(false);
  const [activeList, setActiveList] = useState([0]);

  const [homeworkVisible, setHomeworkVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);

  const {
    isLoadingCreateHomework,
    isLoadingCreateNote,
    isLoadingDeleteNote,
    isLoadingUpdateProgress,
    user,
    noteList,
    progressList,
  } = useSelector((state) => ({
    ...state.homework,
    ...state.auth,
    ...state.user,
    ...state.note,
  }));
  const dispatch = useDispatch();

  const getProgressList = (payload) => dispatch(Actions.GET_PROGRESS(payload));
  const createHomework = (payload) =>
    dispatch(Actions.CREATE_HOMEWORK(payload));
  const updateProgress = (payload) =>
    dispatch(Actions.UPDATE_PROGRESS(payload));
  const getNoteList = (payload) => dispatch(Actions.GET_NOTE_LIST(payload));
  const createNote = (payload) => dispatch(Actions.CREATE_NOTE(payload));
  const deleteNote = (payload) => dispatch(Actions.DELETE_NOTE(payload));

  const unitProgress = progressList.find(
    (progress) => progress.week === syllabusWeek
  );
  const unitStatus = (unitProgress && unitProgress.status) || 0;

  const handleSyllabus = (week) => {
    setSyllabusWeek(week);
  };

  const openPanel = (evt) => {
    setIsCollapseAll(evt.target.checked);
    if (evt.target.checked) {
      setActiveList(
        courses[syllabusWeek].syllabusList.map((syllabus, idx) =>
          syllabus.status ? -1 : idx
        )
      );
    } else {
      setActiveList([]);
    }
  };

  const handleCreateHomework = (payload) => {
    createHomework(payload);
    updateProgress({ week: payload.week }, null);
  };

  const handlePass = (payload) => {
    updateProgress({ week: payload.week, token: payload.token });
  };

  const handleCreateNote = (payload) => {
    createNote({
      week: syllabusWeek,
      ...payload,
    });
  };
  const handleDeleteNote = (id) => {
    deleteNote(id);
  };

  useEffect(() => {
    getNoteList({ week: syllabusWeek });
  }, [syllabusWeek, isLoadingCreateNote, isLoadingDeleteNote]);

  useEffect(() => {
    getProgressList({ userId: user.id });
  }, [isLoadingCreateHomework, isLoadingUpdateProgress]);

  return (
    <div>
      <HomeworkModal
        defaultWeek={syllabusWeek}
        visible={homeworkVisible}
        onCancel={() => setHomeworkVisible(false)}
        onConfirm={handleCreateHomework}
      />
      <NoteModal
        visible={noteVisible}
        onCancel={() => setNoteVisible(false)}
        onConfirm={handleCreateNote}
      />
      ;
      <TokenModal
        week={syllabusWeek}
        visible={tokenVisible}
        onCancel={() => setTokenVisible(false)}
        onConfirm={handlePass}
      />
      <Row gutter={24}>
        <Col md={10}>
          <Card title="課程時程" bordered={false}>
            <Timeline
              schedules={schedules}
              current={current}
              units={progressList}
              handleClick={handleSyllabus}
            />
          </Card>
        </Col>
        <Col md={14}>
          <Card title={schedules[syllabusWeek - 1].title} bordered={false}>
            <div className="w-100 mb3 flex flex-row justify-between item-center">
              <div>
                <Button
                  type="primary"
                  style={{ marginRight: "5px" }}
                  onClick={() => setHomeworkVisible(true)}
                >
                  {unitStatus === 1 ? "更新作業" : "繳交作業"}
                </Button>
                {unitStatus === 0 && (
                  <Button
                    type="primary"
                    style={{ marginRight: "5px" }}
                    onClick={() => setTokenVisible(true)}
                  >
                    輸入通關碼
                  </Button>
                )}
              </div>
              <Checkbox checked={isCollapseAll} onChange={openPanel}>
                全部展開
              </Checkbox>
            </div>
            <Collapse
              bordered={false}
              defaultActiveKey={[0]}
              onChange={(activeList) => setActiveList(activeList)}
              activeKey={activeList}
            >
              {/* ant design bug */}
              {courses[syllabusWeek - 1].syllabusList.map((syllabus, idx) =>
                SyllabusPanel({
                  syllabus,
                  isNotFinish: syllabus.status && unitStatus === 0,
                  idx,
                })
              )}
              {NotePanel({
                userId: user.id,
                notes: noteList,
                handleCreate: () => setNoteVisible(true),
                handleDelete: handleDeleteNote,
              })}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Course;
