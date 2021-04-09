import React, { useEffect, useState } from "react";
import Markdown from "../common/markdown";
import {
  Tooltip,
  Row,
  Col,
  Button,
  Card,
  Checkbox,
  Collapse,
  Modal
} from "antd";
import HomeworkModal from "./homeworkModal";
import NoteModal from "./noteModal";
import TokenModal from "./tokenModal";
import Loading from "../loading";
import { Link } from "react-router-dom";

import Timeline from "./timeline";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions";
import { getSyllabus } from "../../api";

const { confirm } = Modal;

const schedules = [
  {
    title: "第一週（04/12 ~ 04/18）：暖身週",
    description: "掌握 Git 與 Command line 操作",
    date: "2021-04-12"
  },
  {
    title: "第二週（04/19 ~ 04/25）：程式基礎（上）",
    description: "掌握 JavaScript 基礎",
    date: "2021-04-19"
  },
  {
    title: "第三週（04/26 ~ 05/02）：程式基礎（下）",
    description: "熟悉 JavaScript 程式基礎",
    date: "2021-04-26"
  },
  {
    title: "第四週（05/03 ~ 05/09）：網路基礎",
    description: "熟悉網路概念與 API",
    date: "2021-05-03"
  },
  {
    title: "第五週（05/10 ~ 05/16）：複習週",
    description: "複習前幾週所學",
    date: "2021-05-10"
  },
  {
    title: "第六週（05/17 ~ 05/23）：前端基礎（一）",
    description: "掌握基本 HTML 與 CSS",
    date: "2021-05-17"
  },
  {
    title: "第七週（05/24 ~ 05/30）：前端基礎（二）",
    description: "在網頁上使用 JavaScript 與事件處理",
    date: "2021-05-24"
  },
  {
    title: "第八週（05/31 ~ 06/06）：前端基礎（三）",
    description: "用 JavaScript 與後端溝通",
    date: "2021-05-31"
  },
  {
    title: "第九週（06/07 ~ 06/13）：後端基礎（一）",
    description: "掌握 PHP 與 SQL 基礎用法",
    date: "2021-06-07"
  },
  {
    title: "第十週（06/14 ~ 06/20）：複習週",
    description: "複習前幾週所學",
    date: "2021-06-14"
  },
  {
    title: "第十一週（06/21 ~ 06/27）：資訊安全",
    description: "認識資訊安全以及防範方法",
    date: "2021-06-21"
  },
  {
    title: "第十二週（06/28 ~ 07/04）：前後端整合",
    description: "前後端整合",
    date: "2021-06-28"
  },
  {
    title: "第十三週（07/05 ~ 07/11）：現代前端工具",
    description: "熟悉現代前端工具",
    date: "2021-07-05"
  },
  {
    title: "第十四週（07/12 ~ 07/18）：伺服器與網站部署",
    description: "知道如何部署自己的程式",
    date: "2021-07-12"
  },
  {
    title: "第十五週（07/19 ~ 07/25）：複習週",
    description: "複習前幾週所學",
    date: "2021-07-19"
  },
  {
    title: "第十六週（07/26 ~ 08/01）：JavaScript 核心與物件導向",
    description: "理解 Event Loop 與 JS 觀念",
    date: "2021-07-26"
  },
  {
    title: "第十七週（08/02 ~ 08/08）：現代後端開發（上）",
    description: "熟悉 Express",
    date: "2021-08-02"
  },
  {
    title: "第十八週(08/09 ~ 08/15）：現代後端開發（下）",
    description: "熟悉 ORM 與部署",
    date: "2021-08-09"
  },
  {
    title: "第十九週（08/16 ~ 08/22）：產品開發流程",
    description: "熟悉產品開發流程",
    date: "2021-08-16"
  },
  {
    title: "第二十週（08/23 ~ 08/29）：複習週",
    description: "複習前幾週所學",
    date: "2021-08-23"
  },
  {
    title: "第二十一週（08/30 ~ 09/05）：前端框架（一）",
    description: "前端框架",
    date: "2021-08-30"
  },
  {
    title: "第二十二週（09/06 ~ 09/12）：前端框架（二）",
    description: "前端框架",
    date: "2021-09-06"
  },
  {
    title: "第二十三週（09/13 ~ 09/19）：前端框架（三）",
    description: "前端框架",
    date: "2021-09-13"
  },
  {
    title: "第二十四週（09/20 ~ 09/26）：前端框架（四）",
    description: "前端框架",
    date: "2021-09-20"
  },
  {
    title: "第二十五週（09/27 ~ 10/03）：Final Project",
    description: "Final Project",
    date: "2021-09-27"
  },
  {
    title: "第二十六週（10/04 ~ 10/10）：Final Project",
    description: "Final Project",
    date: "2021-10-04"
  }
];

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
    {<Markdown source={syllabus.content} allowHtml />}
  </Collapse.Panel>
);

const NotePanel = ({ userId, notes, handleCreate, handleDelete }) => (
  <Collapse.Panel header="筆記">
    <ul>
      {!!!notes.length && <span>快來新增筆記吧!</span>}
      {!!notes.length &&
        notes.map((note, idx) => (
          <li key={idx}>
            <a
              href={note.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mr2"
            >
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
  const [syllabusList, setSyllabusList] = useState([]);

  const [homeworkVisible, setHomeworkVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    isLoadingCreateHomework,
    isLoadingCreateNote,
    isLoadingDeleteNote,
    isLoadingUpdateProgress,
    user,
    noteList,
    progressList
  } = useSelector(state => ({
    ...state.homework,
    ...state.auth,
    ...state.user,
    ...state.note
  }));
  const dispatch = useDispatch();

  const getProgressList = payload => dispatch(Actions.GET_PROGRESS(payload));
  const createHomework = payload => dispatch(Actions.CREATE_HOMEWORK(payload));
  const updateProgress = payload => dispatch(Actions.UPDATE_PROGRESS(payload));
  const getNoteList = payload => dispatch(Actions.GET_NOTE_LIST(payload));
  const createNote = payload => dispatch(Actions.CREATE_NOTE(payload));
  const deleteNote = payload => dispatch(Actions.DELETE_NOTE(payload));

  const unitProgress = progressList.find(
    progress => progress.week === syllabusWeek
  );
  const unitStatus = (unitProgress && unitProgress.status) || 0;

  const handleSyllabus = week => {
    setSyllabusWeek(week);
  };

  const openPanel = isOpen => {
    const activeList = syllabusList.map((syllabus, idx) =>
      syllabus.visible && unitStatus === 0 ? -1 : idx
    );
    if (isOpen) {
      setActiveList([...activeList, activeList.length]);
    } else {
      setActiveList([]);
    }
  };

  const handleChcked = evt => {
    setIsCollapseAll(evt.target.checked);
    openPanel(evt.target.checked);
  };

  const handleCreateHomework = payload => {
    createHomework(payload);
    updateProgress({ week: payload.week }, null);
  };

  const handlePass = payload => {
    updateProgress({ week: payload.week, token: payload.token });
  };

  const handleCreateNote = payload => {
    createNote({
      week: syllabusWeek,
      ...payload
    });
  };
  const handleDeleteNote = id => {
    deleteNote(id);
  };

  useEffect(
    () => {
      openPanel(isCollapseAll);
    },
    [syllabusList]
  );

  useEffect(
    () => {
      setLoading(true);
      getNoteList({ week: syllabusWeek });
      getSyllabus({ week: syllabusWeek }).then(res => {
        setSyllabusList(res.data);
        setLoading(false);
      });
    },
    [syllabusWeek, isLoadingCreateNote, isLoadingDeleteNote]
  );

  useEffect(
    () => {
      getProgressList({ userId: user.id });
    },
    [isLoadingCreateHomework, isLoadingUpdateProgress]
  );

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
                  onClick={() => {
                    if (unitStatus === 1) {
                      return setHomeworkVisible(true);
                    }

                    // 先跳自我檢討 modal 出來
                    confirm({
                      title: "交作業前檢查",
                      content: (
                        <div>
                          請問你在寫完作業之後，有先看過
                          <a
                            href={`https://github.com/Lidemy/mentor-program-5th/tree/master/examples/week${syllabusWeek}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            自我檢討
                          </a>
                          並且修正常見錯誤了嗎？
                        </div>
                      ),
                      okText: "有，我看過並修正過了",
                      cancelText: "還沒，我先去看",
                      onOk: () => {
                        setHomeworkVisible(true);
                      }
                    });
                  }}
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
                {user.isAdmin && (
                  <Link to={`/admin/syllabus/${syllabusWeek}`}>編輯課綱</Link>
                )}
              </div>
              <Checkbox checked={isCollapseAll} onChange={handleChcked}>
                全部展開
              </Checkbox>
            </div>
            {!isLoading && (
              <Collapse
                bordered={false}
                onChange={activeList => setActiveList(activeList)}
                activeKey={activeList}
              >
                {/* ant design bug */}
                {syllabusList.map((syllabus, idx) =>
                  SyllabusPanel({
                    syllabus,
                    isNotFinish:
                      !user.isAdmin && syllabus.visible && unitStatus === 0,
                    idx
                  })
                )}
                {NotePanel({
                  userId: user.id,
                  notes: [
                    {
                      title: "第四期學生筆記大補帖",
                      link: "https://hackmd.io/@huli/r1PtmBep8"
                    },
                    ...noteList
                  ],
                  handleCreate: () => setNoteVisible(true),
                  handleDelete: handleDeleteNote
                })}
              </Collapse>
            )}
            {isLoading && <Loading />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Course;
