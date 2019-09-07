import React from "react";
import { Spin } from "antd";

function Loading() {
  return (
    <div
      className="fixed flex items-center justify-center"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        background: "rgba(0, 0, 0, 0.25)"
      }}
    >
      <Spin />
    </div>
  );
}

export default Loading;
