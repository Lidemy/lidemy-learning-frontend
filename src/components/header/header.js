import React, { Component } from "react";
import { Layout, Menu, Button, message } from "antd";
import { Link } from "react-router-dom";
import { login, logout } from "../../utils/firebase";
import NameModal from "./nameModal";
import Loading from "../loading";

const AntdHeader = Layout.Header;

class Header extends Component {
  state = {
    modalOpen: false
  };

  componentDidUpdate(prevProps) {
    const { isLoadingUpdateUser, updateUserError, getCurrentUser } = this.props;
    if (
      prevProps.isLoadingUpdateUser !== isLoadingUpdateUser &&
      !isLoadingUpdateUser
    ) {
      if (updateUserError) {
        message.error("更新失敗");
      } else {
        message.success("更新成功");
        getCurrentUser();
      }
    }
  }

  getSelectedKey = () => {
    const { location } = this.props;
    const pathname = location.pathname;
    if (pathname.indexOf("/reports") === 0) return "reports";
    if (pathname.indexOf("/profile") === 0) return "profile";
    if (pathname.indexOf("/admin/news") === 0) return "adminNews";
    return "home";
  };

  handleLogin = () => {
    login();
  };

  handleLogout = () => {
    logout().then(() => {
      this.props.logout();
      window.location.reload();
    });
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  handleUpdate = data => {
    const { user, updateUser } = this.props;
    updateUser(user.id, data);
  };

  render() {
    const { modalOpen } = this.state;
    const { user, isLogin, isLoadingUpdateUser } = this.props;
    const isMobile = window.innerWidth <= 768;
    return (
      <AntdHeader className="fixed w-100 z-5">
        {isLoadingUpdateUser && <Loading />}
        <NameModal
          visible={modalOpen}
          instance={user}
          onCancel={this.closeModal}
          onConfirm={this.handleUpdate}
        />
        <div className="logo">Lidemy</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.getSelectedKey()]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="home">
            <Link to="/">首頁</Link>
          </Menu.Item>
          {user && (
            <Menu.Item key="reports">
              <Link to="/reports">進度報告</Link>
            </Menu.Item>
          )}
          {user && (
            <Menu.Item key="profile">
              <Link to="/profile">個人檔案</Link>
            </Menu.Item>
          )}
          {user && user.isAdmin && (
            <Menu.Item key="adminNews">
              <Link to="/admin/news">最新消息</Link>
            </Menu.Item>
          )}
          {isMobile && user && isLogin && (
            <Menu.Item key="logout">
              <Button type="primary" onClick={this.handleLogout}>
                登出
              </Button>
            </Menu.Item>
          )}
        </Menu>
        <div
          className="absolute white flex items-center"
          style={{
            right: "32px",
            top: 0,
            height: "64px"
          }}
        >
          {user && !isMobile && (
            <div className="flex items-center mr4">
              <img
                src={user.picture}
                alt="avatar"
                style={{
                  width: "42px",
                  height: "42px",
                  marginRight: "10px"
                }}
              />
              <div>{user.nickname || ""}</div>
            </div>
          )}

          {!isLogin && (
            <Button type="primary" onClick={this.handleLogin}>
              登入
            </Button>
          )}

          {!isMobile && isLogin && user && user.nickname && (
            <Button className="mr2" onClick={this.openModal}>
              更改暱稱
            </Button>
          )}
          {!isMobile && isLogin && (
            <Button type="primary" onClick={this.handleLogout}>
              登出
            </Button>
          )}
        </div>
      </AntdHeader>
    );
  }
}

export default Header;
