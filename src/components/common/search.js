import React from "react";
import { Input, Button, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const search = (userType, dataIndex, handleSearch, handleReset) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${userType} ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <div>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="SearchOutlined"
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    </div>
  ),
  filterIcon: filtered => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) => {
    if (userType !== null) {
      return record[userType][dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    } else {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    }
  },
  render: (text, row) => {
    if (userType === "user") {
      text = row[userType].id;
    }
    if (userType !== null) {
      return (
        <a href={`/users/${text}`} target="_blank" rel="noopener noreferrer">
          <Avatar size="small" src={row[userType].picture} />
          <span className="ml2">
            {row[userType].nickname}
            {row[userType].slackId ? `(${row[userType].slackId})` : ``}
          </span>
        </a>
      );
    } else {
      return (
        <a href={row.prUrl} target="_blank" rel="noopener noreferrer">
          week{text}
        </a>
      );
    }
  }
});

export default search;
