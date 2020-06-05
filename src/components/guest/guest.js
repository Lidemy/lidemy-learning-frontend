import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";
import Loading from "../loading";
import jwtDecode from "jwt-decode";

class Guest extends Component {
  componentDidUpdate(prevProps) {
    const { isLogin, isLoadingRegister, registerResult, history } = this.props;
    if (
      prevProps.isLoadingRegister !== isLoadingRegister &&
      !isLoadingRegister
    ) {
      if (registerResult === "success") {
        message.success("註冊成功！會在兩秒鐘之後自動跳轉");
        return setTimeout(() => {
          window.location = "/";
        }, 2000);
      }

      setTimeout(() => {
        // window.location.reload();
      }, 2000);
    }

    if (prevProps.isLogin !== isLogin) {
      this.verifyInvite();
    }
  }

  verifyInvite() {
    const { isLogin, match, register } = this.props;
    if (!match.params || !match.params.token) {
      return;
    }
    const isValid = jwtDecode(match.params.token).exp > Date.now() / 1000;
    if (isValid && isLogin) {
      register(match.params.token);
    } else if (!isLogin) {
      message.error("尚未登入");
    } else if (!isValid) {
      message.error("連結逾期");
    }
  }

  render() {
    const { isLogin, isLoadingGetUser } = this.props;
    return (
      <div>
        {isLoadingGetUser && <Loading />}
        {!isLogin && (
          <p>
            請登入，如果你已經使用邀請連結註冊過帳號，登入卻還是看到此訊息，代表你沒有權限，請找
            @huli 尋求協助
          </p>
        )}
        {isLogin && (
          <p>
            請使用邀請連結加入學習系統，如果已經使用邀請連結還是看到此訊息，請找
            @huli 尋求協助
          </p>
        )}
      </div>
    );
  }
}

export default withRouter(Guest);
