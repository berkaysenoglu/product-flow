import React from "react";

import { Layout, ConfigProvider, Switch, theme } from "antd";

export const Header = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Layout.Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "100px",
          justifyContent: "space-between",
          padding: "0 0px",
        }}
      >
        <div className="header-img">
          <img src="./productflow.png" alt="Logo"></img>
        </div>
        <Switch></Switch>
      </Layout.Header>
    </ConfigProvider>
  );
};
