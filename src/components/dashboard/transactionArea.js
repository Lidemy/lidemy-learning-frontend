/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Row,
  Col,
  Table,
  message,
  Popconfirm
} from "antd";
import moment from "moment";
import {
  getAdminTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../../api";
import CreateTransactionModal from "./createTransactionModal";

function TransactionArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [
    isCreateTransactionModalOpen,
    setIsCreateTransactionModalOpen
  ] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [transactionCount, setTransactionCount] = useState(0);

  function getTransactionsData() {
    setIsLoading(true);
    getAdminTransactions({
      page,
      status: filters.status && filters.status[0]
    })
      .then(res => {
        setIsLoading(false);
        const { data } = res;
        setTransactions(data.transactions);
        setTransactionCount(data.count);
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
        title: "使用者",
        dataIndex: "User",
        key: "User",
        render: user => {
          return (
            <a
              href={`/users/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar size="small" src={user.picture} />
              <span className="ml2">
                {user.nickname}
                {user.slackId ? `(${user.slackId})` : ``}
              </span>
            </a>
          );
        }
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
        title: "後五碼",
        dataIndex: "bankCode",
        key: "bankCode"
      },
      {
        title: "狀態",
        dataIndex: "status",
        key: "status",
        filterMultiple: false,
        filters: [
          {
            text: "未付款",
            value: "pending"
          },
          {
            text: "確認中",
            value: "confirming"
          },
          {
            text: "已付款",
            value: "paid"
          }
        ],
        filtered: true,
        render: (status, record) => {
          if (record.isDelete) return "已刪除";
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
              {record.status === "confirming" && (
                <Popconfirm
                  title="你確定要確認嗎？"
                  onConfirm={() => {
                    setIsLoading(true);
                    updateTransaction(record.id, {
                      status: "paid"
                    })
                      .then(() => {
                        setIsLoading(false);
                        message.success("更新成功");
                        getTransactionsData();
                      })
                      .catch(() => {
                        setIsLoading(false);
                        message.error("更新失敗");
                      });
                  }}
                  okText="是"
                  cancelText="否"
                >
                  <a>確認</a>
                </Popconfirm>
              )}

              {record.status === "pending" && !record.isDelete && (
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

  function handleTableChange(pagination, filters) {
    setPage(pagination.current);
    setFilters(filters);
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

  useEffect(
    () => {
      getTransactionsData();
    },
    [page, filters]
  );

  return (
    <Row gutter={32}>
      <CreateTransactionModal
        visible={isCreateTransactionModalOpen}
        onCancel={() => setIsCreateTransactionModalOpen(false)}
        onConfirm={handleCreateModalConfirm}
      />
      <Col md={32}>
        <Card title="學費紀錄" bordered={false}>
          <div style={{ marginBottom: "8px" }}>
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
            onChange={handleTableChange}
            pagination={{
              total: transactionCount,
              defaultPageSize: 20
            }}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default TransactionArea;
