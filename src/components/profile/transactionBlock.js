/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Row,
  Col,
  Input,
  Table,
  Modal,
  message,
  Popconfirm
} from "antd";
import moment from "moment";
import {
  userSelectPlan,
  getTransactions,
  paidTransaction,
  createTransaction,
  deleteTransaction
} from "../../api";
import storage from "../../utils/storage";
import PayModal from "./payModal";
import CreateTransactionModal from "./createTransactionModal";

const { confirm } = Modal;

function PlanSelectionBlock({ user }) {
  const { disablePlanSelect } = user;
  const [isPlanSelectLoading, setIsPlanSelectLoading] = useState(false);

  const selectPlan = plan => {
    const planName = plan === "A" ? "A 買斷方案" : "B 求職方案";
    const content =
      plan === "A"
        ? "保證金 5000 元"
        : "保證金 5000 元加上第一期學費 12500 = 17500 元";
    confirm({
      title: "確定要選擇 " + planName + "嗎？",
      content: "選擇後會自動產生付款資訊。需要繳交" + content,
      onOk() {
        setIsPlanSelectLoading(true);
        userSelectPlan({
          plan
        })
          .then(res => {
            setIsPlanSelectLoading(false);
            message.success("選擇方案成功！重新載入頁面...");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch(err => {
            setIsPlanSelectLoading(false);
            console.log(err);
            message.error("選擇方案失敗！若碰到這問題多次請私訊 @huli");
          });
      }
    });
  };

  return (
    <Row gutter={32}>
      <Col md={32}>
        <Card title="方案選擇" bordered={false}>
          <p>請確認你要選擇的方案：</p>
          <p>
            A 求職方案：每週需付出 50
            小時以上，要有轉職意願，有淘汰制，兩週內每日進度報告累積缺交三次及淘汰。
            <br />
            需要付保證金 5000 元，結業兩個月內有找到工作薪水為 12%
            的年薪，沒找到工作學費全免
          </p>
          <p>
            B
            買斷方案：適合想要學習但無法付出這麼多時間的人，無淘汰機制及學習期限，計畫結束後依然可以觀看課程
            <br />
            需要付保證金 5000 元加上第一期學費 12500 元共 17500 元，之後每個月付
            12500 元，學費總額是 55000 元
          </p>
          <p>
            更詳細方案的介紹請參考：
            <a
              href="https://bootcamp.lidemy.com/course-info.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              課程資訊
            </a>
            ，有問題請私訊 @huli
          </p>
          {disablePlanSelect && (
            <Alert
              message="不符合 A 求職方案資格"
              description="由於你前八週已符合淘汰資格，因此無法選擇 A 求職方案，只能選擇 B 買斷方案。有疑問的話請私訊 @huli 討論，感謝！"
              type="error"
            />
          )}
          <div style={{ marginTop: "12px" }}>
            {!disablePlanSelect && (
              <Button
                type="primary"
                loading={isPlanSelectLoading}
                onClick={() => selectPlan("A")}
              >
                選擇 A 求職方案
              </Button>
            )}
            <Button
              type="primary"
              loading={isPlanSelectLoading}
              onClick={() => selectPlan("B")}
              style={{ marginLeft: "6px" }}
            >
              選擇 B 買斷方案
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

function Transactions({ user }) {
  const { priceType } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [payInfo, setPayInfo] = useState();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [
    isCreateTransactionModalOpen,
    setIsCreateTransactionModalOpen
  ] = useState(false);
  const [bankCode, setBankCode] = useState();

  function getTransactionsData() {
    setIsLoading(true);
    getTransactions()
      .then(res => {
        setIsLoading(false);
        const { data } = res;
        setTransactions(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function getColumns() {
    const columns = [
      {
        title: "TID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "名稱",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "金額",
        dataIndex: "amount",
        key: "amount"
      },
      {
        title: "狀態",
        dataIndex: "status",
        key: "status",
        render: status => {
          if (status === "pending") return "未付款";
          if (status === "confirming") return "確認中";
          if (status === "paid") return "已付款";
          return status;
        }
      },
      {
        title: "付款日期",
        dataIndex: "paidTime",
        key: "paidTime",
        render: time => (time ? moment(time).format("YYYY-MM-DD") : "-")
      },
      {
        title: "截止日期",
        dataIndex: "expireTime",
        key: "expireTime",
        render: time => moment(time).format("YYYY-MM-DD")
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => {
          if (record.status === "paid") return "-";
          return (
            <span>
              {record.status === "pending" && (
                <a
                  onClick={() => {
                    setPayInfo(record);
                    setIsPayModalOpen(true);
                  }}
                >
                  付款
                </a>
              )}
              &nbsp;&nbsp;&nbsp;
              {!record.isCreateByAdmin && record.status === "pending" && (
                <Popconfirm
                  title="你確定要刪除嗎？"
                  onConfirm={() => {
                    setIsLoading(true);
                    deleteTransaction(record.id)
                      .then(() => {
                        setIsLoading(false);
                        message.success("刪除成功");
                        getTransactionsData();
                      })
                      .catch(() => {
                        setIsLoading(false);
                        message.error("刪除失敗");
                      });
                  }}
                  okText="是"
                  cancelText="否"
                >
                  <a>刪除</a>
                </Popconfirm>
              )}
            </span>
          );
        }
      }
    ];
    return columns;
  }

  function handlePayModalConfirm({ bankCode, payDate }) {
    setIsPayModalOpen(false);
    setIsLoading(true);
    paidTransaction(payInfo.id, {
      bankCode: bankCode,
      payTime: payDate
    })
      .then(() => {
        // reload table
        message.success("更新成功！");
        getTransactionsData();
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        message.error("更新失敗：" + err.message);
      });
  }

  function handleCreateModalConfirm(data) {
    setIsCreateTransactionModalOpen(false);
    setIsLoading(true);
    createTransaction(data)
      .then(() => {
        message.success("新增成功！");
        getTransactionsData();
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        message.error("新增失敗：" + err.message);
      });
  }

  useEffect(() => {
    getTransactionsData();
    setBankCode(storage.getBankCode() || "");
  }, []);

  return (
    <Row gutter={32}>
      <Col md={32}>
        <PayModal
          visible={isPayModalOpen}
          onCancel={() => setIsPayModalOpen(false)}
          onConfirm={handlePayModalConfirm}
        />
        <CreateTransactionModal
          visible={isCreateTransactionModalOpen}
          onCancel={() => setIsCreateTransactionModalOpen(false)}
          onConfirm={handleCreateModalConfirm}
        />
        <Card title="學費紀錄" bordered={false}>
          <p>
            你目前選擇的方案是：{priceType}{" "}
            {priceType === "A" ? "求職" : "買斷"}方案，要換方案的話請直接私訊
            @huli
          </p>
          <p style={{ whiteSpace: "pre" }}>
            <h4>付款資訊</h4>
            {decodeURIComponent(
              "%E9%8A%80%E8%A1%8C%E4%BB%A3%E8%99%9F%EF%BC%9A808%0A%E5%B8%B3%E8%99%9F%EF%BC%9A0521-979-142266%0A%E5%B8%B3%E8%99%9F%E7%84%A1%E7%AC%A6%E8%99%9F%E7%89%88%EF%BC%9A0521979142266"
            )}
          </p>
          <div style={{ marginTop: "12px", marginBottom: "8px" }}>
            <div>
              目前帳號後五碼：
              <Input
                onChange={e => setBankCode(e.target.value)}
                name="bankCode"
                value={bankCode}
              />
              <Button
                type="primary"
                style={{ marginTop: "6px" }}
                onClick={() => {
                  setBankCode(bankCode);
                  storage.setBankCode(bankCode);
                  message.success("更新成功！");
                }}
              >
                更新
              </Button>
            </div>
            <Button
              type="primary"
              style={{ marginTop: "16px" }}
              onClick={() => setIsCreateTransactionModalOpen(true)}
            >
              新增款項
            </Button>
          </div>
          <Table
            loading={isLoading}
            columns={getColumns()}
            dataSource={transactions}
            rowKey="id"
          />
        </Card>
      </Col>
    </Row>
  );
}

function TransactionBlock({ user }) {
  return user.isPlanSelected ? (
    <Transactions user={user} />
  ) : (
    <PlanSelectionBlock user={user} />
  );
}

export default TransactionBlock;
