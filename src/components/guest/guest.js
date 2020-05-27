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
        setTimeout(() => {
          history.push("/");
        }, 2000);
      } else {
        if (registerResult === "REPEAT_USER") message.error("重複註冊");
      }
    }

    if (prevProps.isLogin !== isLogin) {
      this.varifyInvite();
    }
  }

  varifyInvite() {
    const { isLogin, match, register } = this.props;
    const isExp = jwtDecode(match.params.token).exp > Date.now() / 1000;
    if (match.params.token) {
      if (isExp && isLogin) {
        register(match.params.token);
      }
      if (!isLogin) {
        message.error("尚未登入");
      }
      if (!isExp) {
        message.error("連結逾期");
      }
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
