import React, { Component } from "react";
import { Input, Button, message } from "antd";
import Loading from "../loading";

class Guest extends Component {
  state = {
    text: ""
  };

  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  submit = () => {
    const { text } = this.state;
    const { register } = this.props;
    register(text);
  };

  componentDidUpdate(prevProps) {
    const { isLoadingRegister, registerResult } = this.props;
    if (
      prevProps.isLoadingRegister !== isLoadingRegister &&
      !isLoadingRegister
    ) {
      if (registerResult) {
        message.success("註冊成功！會在兩秒鐘之後自動跳轉");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        message.error("註冊失敗");
      }
    }
  }

  render() {
    const { text } = this.state;
    const { isLoadingRegister, isLogin, isLoadingGetUser } = this.props;
    return (
      <div>
        {isLoadingGetUser && <Loading />}
        {!isLogin && (
          <p>
            請登入，如果你已經登入卻還是看到此訊息，代表你沒有權限，請找 @huli
            尋求協助
          </p>
        )}
        {isLogin && <p>請在下方輸入框填入邀請碼以加入系統</p>}
        {isLogin && (
          <div>
            <Input value={text} onChange={this.onChange} />
            <Button
              className="mt2"
              disabled={isLoadingRegister}
              type="primary"
              onClick={this.submit}
            >
              送出
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Guest;
