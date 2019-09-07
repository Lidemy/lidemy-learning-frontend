import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import moment from "moment";

import Header from "./containers/header";
import Routes from "./containers/routes";

import "moment/locale/zh-tw";
import "./tachyons.min.css";

import { Layout } from "antd";

const { Content, Footer } = Layout;
moment.locale("zh-tw");

class App extends Component {
  render() {
    const isMobile = window.innerWidth <= 768;
    return (
      <Router>
        <Layout className="layout">
          <Header />
          <Content
            style={{
              padding: isMobile ? "0" : "0 50px",
              marginTop: 64,
              minHeight: "calc(100vh - 64px - 69px)"
            }}
          >
            <div
              className="bg-white"
              style={{ margin: "16px 0", padding: 24, minHeight: "280px" }}
            >
              <Routes />
            </div>
          </Content>
          <Footer className="tc">
            Made with <span style={{ color: "#e25555" }}>&#9829;</span> by{" "}
            <a
              href="https://github.com/aszx87410"
              rel="noopener noreferrer"
              target="_blank"
            >
              huli
            </a>
            <br />
            Last updated: 2019-06-04 10:30:00
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
